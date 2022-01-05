import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Matches, MaxLength, ValidateIf } from 'class-validator'

export class TourManagerNameDTO {
  @ValidateIf(({ name }) => name?.length > 0)
  @ApiPropertyOptional()
  @MaxLength(250)
  @Matches(/^[A-Za-z\s]+$/)
  name: string
}

export class TourManager {
  @ApiProperty()
  tour_manager_id: string

  @ApiProperty()
  created_at: string

  @ApiProperty()
  updated_at: string

  @ApiProperty()
  tour_manager_name: string
}
