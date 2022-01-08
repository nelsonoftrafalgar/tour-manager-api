import * as request from 'supertest'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsModule } from '../src/concerts/concerts.module'
import { ConcertsService } from '../src/concerts/concerts.service'

describe('ConcertsController (e2e)', () => {
  let app: INestApplication

  const mockService = {
    getConcerts: jest.fn((place) => (place ? Promise.resolve(place) : Promise.resolve({}))),
    getConcertsByBandId: jest.fn().mockResolvedValue('d471e2c6-0282-4314-98bc-49836809eb57'),
    createConcert: jest.fn().mockResolvedValue({}),
    updateConcert: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConcertsModule],
    })
      .overrideProvider(ConcertsService)
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

  it('should get all concerts', () => {
    return request(app.getHttpServer()).get('/concerts').expect(200).expect({})
  })

  it('should filter concerts by place', async () => {
    const response = await request(app.getHttpServer()).get('/concerts').query({ place: 'Paris' })

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('Paris')
  })

  it('should validate concert place', async () => {
    const response = await request(app.getHttpServer()).get('/concerts').query({ place: 'Paris!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should get concert by band id', () => {
    return request(app.getHttpServer())
      .get('/concerts/d471e2c6-0282-4314-98bc-49836809eb57')
      .expect(200)
      .expect('d471e2c6-0282-4314-98bc-49836809eb57')
  })

  it('should validate band id', async () => {
    const response = await request(app.getHttpServer())
      .get('/concerts')
      .query({ id: 'd471e2c6-0282-4314-98bc-49836809eb57!' })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should create new concert', () => {
    return request(app.getHttpServer())
      .post('/concerts')
      .send({
        concert_date: '2021-03-06T17:30:05.519Z',
        concert_place: 'Oslo',
        band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      })
      .expect(201)
      .expect({})
  })

  it('should validate new concert data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer()).post('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo?',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z!',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57$',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).post('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4*',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })

  it('should update concert', () => {
    return request(app.getHttpServer())
      .put('/concerts')
      .send({
        concert_date: '2021-03-06T17:30:05.519Z',
        concert_place: 'Oslo',
        band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
        tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
        concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
      })
      .expect(200)
      .expect({})
  })

  it('should validate updated concert data', async () => {
    let response: request.Response
    response = await request(app.getHttpServer()).put('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z@',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955@',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo%',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955@',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb54^',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4#',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()

    response = await request(app.getHttpServer()).put('/concerts').send({
      concert_date: '2021-03-06T17:30:05.519Z',
      concert_place: 'Oslo',
      band_id: 'd471e2c6-0282-4314-98bc-49836809eb57',
      tour_manager_id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
      concert_id: '2e756ddc-191a-4728-97a4-e90a6ffe4955@',
    })

    expect(response.status).toEqual(400)
    expect(response.badRequest).toBeTruthy()
  })
})
