import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { SalariesModule } from '../src/salaries/salaries.module'
import { SalariesService } from '../src/salaries/salaries.service'

describe('SalariesController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    createSalary: jest.fn().mockResolvedValue({}),
    getReport: jest.fn().mockResolvedValue({}),
    updateSalary: jest.fn().mockResolvedValue({}),
    deleteSalary: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SalariesModule],
    })
      .overrideProvider(SalariesService)
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

  it('should get report', () => {
    return request(app.getHttpServer())
      .get('/salaries')
      .query({
        band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
        concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
      })
      .expect(200)
      .expect({})
  })

  it('should validate report params', async () => {
    let response: request.Response
    response = await request(app.getHttpServer()).get('/salaries').query({
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57!',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).get('/salaries').query({
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4!',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).get('/salaries').query({
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955!',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should create new salary', () => {
    return request(app.getHttpServer())
      .post('/salaries')
      .send({
        amount: '4324245',
        band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
        concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
      })
      .expect(201)
      .expect({})
  })

  it('should validate new salary data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer()).post('/salaries').send({
      amount: '4324245 ',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/salaries').send({
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57!',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/salaries').send({
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4!',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/salaries').send({
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955!',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should update salary', () => {
    return request(app.getHttpServer())
      .put('/salaries')
      .send({
        salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        amount: '4324245',
        band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
        concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
      })
      .expect(200)
      .expect({})
  })

  it('should validate updated salary data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer()).put('/salaries').send({
      salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57@',
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/salaries').send({
      salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57@',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/salaries').send({
      salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4!',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/salaries').send({
      salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      amount: '4324245',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955!',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/salaries').send({
      salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      amount: '4324245 ',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should delete salary', () => {
    return request(app.getHttpServer())
      .delete('/salaries')
      .send({ salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57' })
      .expect(200)
      .expect({})
  })

  it('should validate delete salary id', async () => {
    const response = await request(app.getHttpServer())
      .delete('/salaries')
      .send({ salary_id: 'd471e2c6-0282-4314-98bc-49836809eb57@' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
