import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsController } from '../../src/concerts/concerts.controller'
import { ConcertsService } from '../../src/concerts/concerts.service'

describe('ConcertsController', () => {
  let controller: ConcertsController

  const mockService = {
    getConcerts: jest.fn(() => ({})),
    getConcertsByBandId: jest.fn(() => ({})),
    createConcert: jest.fn(() => ({})),
    updateConcert: jest.fn(() => ({})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [ConcertsService],
    })
      .overrideProvider(ConcertsService)
      .useValue(mockService)
      .compile()

    controller = module.get<ConcertsController>(ConcertsController)
  })

  it('should be able to get concerts list', () => {
    expect(controller.getConcerts({ place: undefined })).toMatchObject({})
  })

  it('should be able to get concert by band id', () => {
    expect(controller.getConcertsByBandId({ band_id: '' })).toMatchObject({})
  })

  it('should be able to create new concert', () => {
    expect(
      controller.createConcert({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' })
    ).toMatchObject({})
  })

  it('should be able to update concert', () => {
    expect(
      controller.updateConcert({
        concert_date: '',
        concert_place: '',
        band_id: '',
        tour_manager_id: '',
        concert_id: '',
      })
    ).toMatchObject({})
  })
})
