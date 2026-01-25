import { IsString, IsNotEmpty, IsDateString, IsOptional, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  timezone: string;

  @IsString()
  @IsIn(['blue', 'green', 'red', 'yellow', 'purple', 'orange'])
  color: string;

  @IsString()
  @IsOptional()
  description?: string;
}
