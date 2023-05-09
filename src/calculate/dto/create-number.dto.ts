import { IsNumber } from 'class-validator';

export class CreateNumberDto {
  @IsNumber()
  readonly num: number;
}
