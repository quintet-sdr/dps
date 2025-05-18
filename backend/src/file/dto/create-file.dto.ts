import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateFileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty()
  @IsNotEmpty()
  filename: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  owner_id: number

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  uploaded_at: Date
}
