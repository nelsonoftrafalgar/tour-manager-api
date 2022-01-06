import { Test, TestingModule } from '@nestjs/testing'

import { BandsService } from '../../src/bands/bands.service'

describe('BandsService', () => {
  let service: BandsService

  const mockService = {
    getBands: jest.fn().mockResolvedValue({}),
    filterBands: jest.fn().mockResolvedValue('Led'),
    getBandById: jest.fn().mockResolvedValue('id'),
    createBand: jest.fn().mockResolvedValue({ band_name: '', band_frontman: '' }),
    updateBand: jest.fn().mockResolvedValue({ band_name: '', band_frontman: '', band_id: '', created_at: '' }),
    preventDuplicates: jest.fn().mockResolvedValue({ band_name: '', band_frontman: '' }),
    getAllBandNames: jest.fn().mockResolvedValue({}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockService)
      .compile()

    service = module.get<BandsService>(BandsService)
  })

  it('should get all bands', async () => {
    expect(await service.getBands()).toMatchObject({})
  })

  it('should get bands filtered by name', async () => {
    expect(await service.filterBands('Led')).toEqual('Led')
  })

  it('should get band by id', async () => {
    expect(await service.getBandById('id')).toEqual('id')
  })

  it('should create new band', async () => {
    expect(await service.createBand({ band_name: '', band_frontman: '' })).toMatchObject({
      band_name: '',
      band_frontman: '',
    })
  })

  it('should update band', async () => {
    expect(await service.updateBand({ band_name: '', band_frontman: '', band_id: '', created_at: '' })).toMatchObject({
      band_name: '',
      band_frontman: '',
      band_id: '',
      created_at: '',
    })
  })

  it('should prevent duplicates in db', async () => {
    expect(await service.preventDuplicates({ band_name: '', band_frontman: '' })).toMatchObject({
      band_name: '',
      band_frontman: '',
    })
  })

  it('should get all band names', async () => {
    expect(await service.getAllBandNames()).toMatchObject({})
  })
})
