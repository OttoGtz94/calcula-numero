import { IsInt, IsNumber, Min } from 'class-validator';

export class SetNumberDto {
  @IsInt({ message: 'El valor debe de ser un número entero' })
  @Min(1, { message: 'El número debe de ser mayor o igual a 1' })
  readonly num: number;
}
