import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsString, IsUUID, Matches, MaxLength } from 'class-validator'

export const AMOUNT_CONSTRAIN = /^\d+(,\d{1,2})?$/
export const WHITESPACE_CONSTRAIN = /^[^\s]+(\s+[^\s]+)*$/

export class Salary {
  @ApiProperty()
  salary_id: string

  @ApiProperty()
  created_at: string

  @ApiProperty()
  updated_at: string

  @ApiProperty()
  amount: string

  @ApiProperty()
  band_id: string

  @ApiProperty()
  concert_id: string

  @ApiProperty()
  tour_manager_id: string
}

export class SalaryDTO {
  @ApiProperty()
  @IsUUID()
  salary_id: string

  @ApiProperty()
  @IsString()
  @MaxLength(13)
  @Matches(AMOUNT_CONSTRAIN)
  @Matches(WHITESPACE_CONSTRAIN)
  amount: string

  @ApiProperty()
  @IsUUID()
  band_id: string

  @ApiProperty()
  @IsUUID()
  concert_id: string

  @ApiProperty()
  @IsUUID()
  tour_manager_id: string
}

export class DeleteSalaryDTO extends PickType(SalaryDTO, ['salary_id']) {}
export class NewSalaryDTO extends OmitType(SalaryDTO, ['salary_id']) {}
export class NewReportDTO extends OmitType(SalaryDTO, ['salary_id', 'amount']) {}
