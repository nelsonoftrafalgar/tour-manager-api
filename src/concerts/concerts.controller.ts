import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger'
import { BandIdDTO } from 'bands/bands.dto'
import { Concert, ConcertDTO, ConcertPlaceDTO, NewConcertDTO } from './concerts.dto'
import { ConcertsService } from './concerts.service'

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertService: ConcertsService) {}

  @Get()
  @ApiOkResponse({ type: [Concert], description: 'Get filtered or all concerts' })
  getConcerts(@Query() { place }: ConcertPlaceDTO) {
    return this.concertService.getConcerts(place)
  }

  @Get(':band_id')
  @ApiOkResponse({ type: [Concert], description: 'Get concert by band ID' })
  getConcertsByBandId(@Param() { band_id }: BandIdDTO) {
    return this.concertService.getConcertsByBandId(band_id)
  }

  @Post()
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  @ApiOkResponse({ type: [Concert], description: 'Add new concert' })
  createConcert(@Body() data: NewConcertDTO) {
    return this.concertService.createConcert(data)
  }

  @Put()
  @ApiConflictResponse({ description: 'Concert already exists in DB' })
  @ApiOkResponse({ type: [Concert], description: 'Edit existing concert' })
  updateConcert(@Body() data: ConcertDTO) {
    return this.concertService.updateConcert(data)
  }
}
