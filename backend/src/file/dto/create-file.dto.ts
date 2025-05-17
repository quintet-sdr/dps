import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateFileDto {
  @ApiProperty()
  @IsNotEmpty()
  filename: string

  @ApiProperty()
  @IsNotEmpty()
  owner_id: number

  @ApiProperty()
  @IsNotEmpty()
  uploaded_at: Date
}
