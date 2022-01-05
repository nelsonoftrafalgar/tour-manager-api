import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersModule } from '../src/tour-managers/tour-managers.module'
import { TourManagersService } from '../src/tour-managers/tour-managers.service'

describe('TourManagersController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    getTourManagers: jest.fn((name) => (name ? Promise.resolve(name) : Promise.resolve({}))),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TourManagersModule],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockService)
      .compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    )
    await app.init()
  })

  it('should get all tour managers', () => {
    return request(app.getHttpServer()).get('/tour-managers').expect(200).expect({})
  })

  it('should filter tour managers by name', async () => {
    const response = await request(app.getHttpServer()).get('/tour-managers').query({ name: 'Sam' })

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Sam')
  })

  it('should validate tour manager name', async () => {
    const response = await request(app.getHttpServer()).get('/tour-managers').query({ name: 'Sam!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
