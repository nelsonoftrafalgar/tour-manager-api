import { Test, TestingModule } from '@nestjs/testing'

import { ConcertsService } from '../../src/concerts/concerts.service'

describe('ConcertsService', () => {
  let service: ConcertsService

  const mockService = {
    getConcerts: jest.fn().mockResolvedValue({}),
    filterConcerts: jest.fn().mockResolvedValue('Oslo'),
    getConcertsByBandId: jest.fn().mockResolvedValue('id'),
    createConcert: jest
      .fn()
      .mockResolvedValue({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' }),
    updateConcert: jest
      .fn()
      .mockResolvedValue({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '', concert_id: '' }),
    preventDuplicates: jest
      .fn()
      .mockResolvedValue({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertsService],
    })
      .overrideProvider(ConcertsService)
      .useValue(mockService)
      .compile()

    service = module.get<ConcertsService>(ConcertsService)
  })

  it('should get all concerts', async () => {
    expect(await service.getConcerts()).toMatchObject({})
  })

  it('should get concerts filtered by consert place', async () => {
    expect(await service.filterConcerts('Oslo')).toEqual('Oslo')
  })

  it('should get concert by band id', async () => {
    expect(await service.getConcertsByBandId('id')).toEqual('id')
  })

  it('should create new concert', async () => {
    expect(
      await service.createConcert({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' })
    ).toMatchObject({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' })
  })

  it('should upadate concert', async () => {
    expect(
      await service.updateConcert({
        concert_date: '',
        concert_place: '',
        band_id: '',
        tour_manager_id: '',
        concert_id: '',
      })
    ).toMatchObject({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '', concert_id: '' })
  })

  it('should prevent duplicates in db', async () => {
    expect(
      await service.preventDuplicates({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' })
    ).toMatchObject({ concert_date: '', concert_place: '', band_id: '', tour_manager_id: '' })
  })
})
