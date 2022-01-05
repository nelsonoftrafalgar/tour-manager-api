import { Module } from '@nestjs/common'
import { TourManagersController } from './tour-managers.controller'
import { TourManagersService } from './tour-managers.service'

@Module({
  providers: [TourManagersService],
  controllers: [TourManagersController],
})
export class TourManagersModule {}
