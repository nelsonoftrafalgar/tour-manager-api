import { BandsController } from './bands.controller'
import { BandsService } from './bands.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [BandsService],
  controllers: [BandsController],
})
export class BandsModule {}
