import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { BandsModule } from '../src/bands/bands.module'
import { BandsService } from '../src/bands/bands.service'

describe('BandsController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    getBands: jest.fn((name) => (name ? Promise.resolve(name) : Promise.resolve({}))),
    getAllBandNames: jest.fn().mockResolvedValue({}),
    getBandById: jest.fn().mockResolvedValue('3e3d8eee-dc3a-422f-9658-b08f61b84d1d'),
    createBand: jest.fn().mockResolvedValue({}),
    updateBand: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BandsModule],
    })
      .overrideProvider(BandsService)
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

  it('should get all bands', () => {
    return request(app.getHttpServer()).get('/bands').expect(200).expect({})
  })

  it('should filter bands by name', async () => {
    const response = await request(app.getHttpServer()).get('/bands').query({ name: 'Led' })

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Led')
  })

  it('should validate band name', async () => {
    const response = await request(app.getHttpServer()).get('/bands').query({ name: 'Led!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should get all band names', () => {
    return request(app.getHttpServer()).get('/bands/all_names').expect(200).expect({})
  })

  it('should get band by id', () => {
    return request(app.getHttpServer())
      .get('/bands/3e3d8eee-dc3a-422f-9658-b08f61b84d1d')
      .expect(200)
      .expect('3e3d8eee-dc3a-422f-9658-b08f61b84d1d')
  })

  it('should validate band id', async () => {
    const response = await request(app.getHttpServer())
      .get('/bands')
      .query({ id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should create new band', () => {
    return request(app.getHttpServer())
      .post('/bands')
      .send({ band_name: 'mock band name', band_frontman: 'mock band frontman' })
      .expect(201)
      .expect({})
  })

  it('should validate new band data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer())
      .post('/bands')
      .send({ band_name: 'mock band name ', band_frontman: 'mock band frontman' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/bands')
      .send({ band_name: 'mock band name', band_frontman: 'mock band frontman ' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/bands')
      .send({ band_name: 'mock band name ?', band_frontman: 'mock band frontman' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer())
      .post('/bands')
      .send({ band_name: 'mock band name', band_frontman: 'mock band frontman ?' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should update band', () => {
    return request(app.getHttpServer())
      .put('/bands')
      .send({
        band_name: 'mock band name',
        band_frontman: 'mock band frontman',
        band_id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
        created_at: '2022-01-06T17:30:05.519Z',
      })
      .expect(200)
      .expect({})
  })

  it('should validate updated band data', async () => {
    const response = await request(app.getHttpServer()).put('/bands').send({
      band_name: 'mock band name',
      band_frontman: 'mock band frontman',
      band_id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
      created_at: '2022-01-06T17:30:05.519Z!',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
