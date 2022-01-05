import { Test, TestingModule } from '@nestjs/testing'

import { TourManagersController } from './tour-managers.controller'
import { TourManagersService } from './tour-managers.service'

describe('TourManagersController', () => {
  let controller: TourManagersController
  const mockService = {
    getTourManagers: jest.fn(() => ({})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourManagersController],
      providers: [TourManagersService],
    })
      .overrideProvider(TourManagersService)
      .useValue(mockService)
      .compile()

    controller = module.get<TourManagersController>(TourManagersController)
  })

  it('should be able to get tour managers list', () => {
    expect(controller.getTourManagers({ name: undefined })).toEqual({})
  })
})
