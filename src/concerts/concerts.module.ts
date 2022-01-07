import { ConcertsController } from './concerts.controller'
import { ConcertsService } from './concerts.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [ConcertsService],
  controllers: [ConcertsController],
})
export class ConcertsModule {}
