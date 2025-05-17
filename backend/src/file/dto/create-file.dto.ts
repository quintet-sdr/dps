import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  owner_id: number;

  @IsNotEmpty()
  uploaded_at: Date;
}
