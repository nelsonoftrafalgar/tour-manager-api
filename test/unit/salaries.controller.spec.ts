import { Test, TestingModule } from '@nestjs/testing'

import { SalariesController } from '../../src/salaries/salaries.controller'
import { SalariesService } from '../../src/salaries/salaries.service'

describe('SalariesController', () => {
  let controller: SalariesController

  const mockService = {
    createSalary: jest.fn(() => ({})),
    getReport: jest.fn(() => ({})),
    updateSalary: jest.fn(() => ({})),
    deleteSalary: jest.fn(() => ({})),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalariesController],
      providers: [SalariesService],
    })
      .overrideProvider(SalariesService)
      .useValue(mockService)
      .compile()

    controller = module.get<SalariesController>(SalariesController)
  })

  it('should be able to get concerts list', () => {
    expect(controller.getReport({ band_id: '', concert_id: '', tour_manager_id: '' })).toMatchObject({})
  })

  it('should be able to delete salary', () => {
    expect(controller.deleteSalary({ salary_id: '' })).toMatchObject({})
  })

  it('should be able to create new salary', () => {
    expect(controller.createSalary({ amount: '', band_id: '', concert_id: '', tour_manager_id: '' })).toMatchObject({})
  })

  it('should be able to update salary', () => {
    expect(
      controller.updateSalary({ amount: '', band_id: '', concert_id: '', tour_manager_id: '', salary_id: '' })
    ).toMatchObject({})
  })
})
