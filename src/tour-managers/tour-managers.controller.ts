import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { TourManager, TourManagerNameDTO } from './tour-managers.dto'

import { TourManagersService } from './tour-managers.service'

@Controller('tour_managers')
export class TourManagersController {
  constructor(private readonly tourManagersService: TourManagersService) {}

  @Get()
  @ApiOkResponse({ type: [TourManager], description: 'Get filtered or all tour managers' })
  getTourManagers(@Query() { name }: TourManagerNameDTO) {
    return this.tourManagersService.getTourManagers(name)
  }
}
