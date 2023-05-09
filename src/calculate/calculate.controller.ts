import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CalculateService } from './calculate.service';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Get()
  getNum() {
    return 'Hola Numeros';
  }

  @Post(':n')
  setNumber(@Param('n', ParseIntPipe) n: number) {
    return this.calculateService.runCalculations(n);
  }
}
