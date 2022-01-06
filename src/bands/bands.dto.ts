import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsDateString, IsString, IsUUID, Matches, MaxLength, ValidateIf } from 'class-validator'

const NAME_CONSTRAIN = /^[A-Za-z\s]+$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Band {
  @ApiProperty()
  band_id: string

  @ApiProperty()
  band_name: string

  @ApiProperty()
  band_frontman: string

  @ApiProperty()
  created_at: string

  @ApiProperty()
  updated_at: string
}

export class BandName extends PickType(Band, ['band_id', 'band_name']) {}

export class BandNameDTO {
  @ValidateIf(({ name }) => name?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(NAME_CONSTRAIN)
  name: string
}

export class BandDTO {
  @ApiProperty()
  @IsUUID()
  band_id: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  band_name: string

  @ApiProperty()
  @MaxLength(250)
  @IsString()
  @Matches(NAME_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  band_frontman: string

  @ApiProperty()
  @IsDateString()
  created_at: string
}

export class BandIdDTO extends PickType(BandDTO, ['band_id']) {}
export class NewBandDTO extends PickType(BandDTO, ['band_name', 'band_frontman']) {}
