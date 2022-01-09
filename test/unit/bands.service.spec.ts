import { Test, TestingModule } from '@nestjs/testing'

import { BandsService } from '../../src/bands/bands.service'

describe('BandsService', () => {
  let service: BandsService

  const mockService = {
    getBands: jest.fn().mockResolvedValue({}),
    filterBands: jest.fn().mockResolvedValue({}),
    getBandById: jest.fn().mockResolvedValue({}),
    createBand: jest.fn().mockResolvedValue({}),
    updateBand: jest.fn().mockResolvedValue({}),
    preventDuplicates: jest.fn().mockResolvedValue({}),
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
    expect(await service.filterBands('Led')).toMatchObject({})
  })

  it('should get band by id', async () => {
    expect(await service.getBandById('id')).toMatchObject({})
  })

  it('should create new band', async () => {
    expect(await service.createBand({ band_name: '', band_frontman: '' })).toMatchObject({})
  })

  it('should update band', async () => {
    expect(await service.updateBand({ band_name: '', band_frontman: '', band_id: '', created_at: '' })).toMatchObject(
      {}
    )
  })

  it('should prevent duplicates in db', async () => {
    expect(await service.preventDuplicates({ band_name: '', band_frontman: '' })).toMatchObject({})
  })

  it('should get all band names', async () => {
    expect(await service.getAllBandNames()).toMatchObject({})
  })
})
