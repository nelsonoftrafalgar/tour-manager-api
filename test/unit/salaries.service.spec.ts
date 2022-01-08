import { Test, TestingModule } from '@nestjs/testing'

import { SalariesService } from '../../src/salaries/salaries.service'

describe('SalariesService', () => {
  let service: SalariesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalariesService],
    }).compile()

    service = module.get<SalariesService>(SalariesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
