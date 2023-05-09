import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { SetNumberDto } from './dto/set-number.dto';

@Controller('calculate')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Get()
  getNum() {
    return 'Hola Numeros';
  }

  @Post(':n')
  setNumberParams(
    @Param('n', ParseIntPipe)
    n: number,
  ) {
    if (n < 1)
      throw new BadRequestException('Parametro invalido', {
        cause: new Error(),
        description: 'El número debe de ser mayor o igual a 1',
      });
    return this.calculateService.runCalculations(n);
  }

  @Post('')
  setNumberBody(@Body() n: SetNumberDto) {
    return this.calculateService.runCalculations(n.num);
  }
}
