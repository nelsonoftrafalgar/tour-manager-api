import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { DeleteSalaryDTO, NewReportDTO, NewSalaryDTO, Salary, SalaryDTO } from './salaries.dto'
import { SalariesService } from './salaries.service'

@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}

  @Get()
  @ApiOkResponse({ type: [Salary], description: 'Generate report' })
  getReport(@Query() query: NewReportDTO) {
    return this.salariesService.getReport(query)
  }

  @Post()
  @ApiCreatedResponse({ type: [Salary], description: 'Add new salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  createSalary(@Body() data: NewSalaryDTO) {
    return this.salariesService.createSalary(data)
  }

  @Delete()
  @ApiOkResponse({ type: Number, description: 'Delete salary' })
  deleteSalary(@Body() { salary_id }: DeleteSalaryDTO) {
    return this.salariesService.deleteSalary(salary_id)
  }

  @Put()
  @ApiOkResponse({ type: [Salary], description: 'Edit salary' })
  @ApiConflictResponse({ description: 'Salary already exists in DB' })
  updateSalary(@Body() data: SalaryDTO) {
    return this.salariesService.updateSalary(data)
  }
}
