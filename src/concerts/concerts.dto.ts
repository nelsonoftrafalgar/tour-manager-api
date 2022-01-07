import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { IsDateString, IsString, IsUUID, Matches, MaxLength, ValidateIf } from 'class-validator'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Concert {
  @ApiProperty()
  concert_id: string

  @ApiProperty()
  concert_place: string

  @ApiProperty()
  concert_date: string

  @ApiProperty()
  band_id: string

  @ApiProperty()
  tour_manager_id: string
}

export class ConcertPlaceDTO {
  @ValidateIf(({ place }) => place?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  place: string
}

export class ConcertDTO {
  @ApiProperty()
  @IsUUID()
  concert_id: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  concert_place: string

  @ApiProperty()
  @IsDateString()
  concert_date: string

  @ApiProperty()
  @IsUUID()
  band_id: string

  @ApiProperty()
  @IsUUID()
  tour_manager_id: string
}

export class NewConcertDTO extends OmitType(ConcertDTO, ['concert_id']) {}
