import { Test, TestingModule } from '@nestjs/testing'

import { BandsController } from '../../src/bands/bands.controller'
import { BandsService } from '../../src/bands/bands.service'

describe('BandsController', () => {
  let controller: BandsController
  const mockService = {
    getBands: jest.fn(() => ({})),
    getAllBandNames: jest.fn(() => ({})),
    getBandById: jest.fn(() => ({})),
    createBand: jest.fn(() => ({})),
    updateBand: jest.fn(() => ({})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandsController],
      providers: [BandsService],
    })
      .overrideProvider(BandsService)
      .useValue(mockService)
      .compile()

    controller = module.get<BandsController>(BandsController)
  })

  it('should be able to get bands list', () => {
    expect(controller.getBands({ name: undefined })).toMatchObject({})
  })

  it('should be able to get all band names', () => {
    expect(controller.getAllBandNames()).toMatchObject({})
  })

  it('should be able to get band by id', () => {
    expect(controller.getBandById({ band_id: '' })).toMatchObject({})
  })

  it('should be able to create new band', () => {
    expect(controller.createBand({ band_name: '', band_frontman: '' })).toMatchObject({})
  })

  it('should be able to update band', () => {
    expect(
      controller.updateBand({
        band_id: '',
        band_name: '',
        band_frontman: '',
        created_at: '',
      })
    ).toMatchObject({})
  })
})
