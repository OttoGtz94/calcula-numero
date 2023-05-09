import { Injectable } from '@nestjs/common';
import { SetNumberDto } from './dto/set-number.dto';
import { Calculation } from './interface/calculation.interface';

@Injectable()
export class CalculateService {
  evenNumber(n: number): boolean {
    return n % 2 === 0;
  }

  primeNumber(n: number): boolean {
    for (let aux = 2; aux < n; aux++) {
      if (n % aux === 0) return false;
    }
    return true;
  }

  factorial(n: number): number {
    let nfactorial = n;
    for (let aux = n - 1; aux >= 1; aux--) {
      nfactorial = nfactorial * aux;
    }
    return nfactorial;
  }

  addIntegers(n: number): number {
    let addition: number = 0;
    for (let aux = 1; aux <= n; aux++) {
      addition += aux;
    }
    return addition;
  }

  factors(n: number): number[] {
    const arr: number[] = [1];
    for (let aux = 2; aux <= n; aux++) {
      if (n % aux === 0) {
        arr.push(aux);
      }
    }
    return arr;
  }

  fibonacciSerie(n: number): number[] {
    const arr: number[] = [0, 1];
    for (let aux = 2; aux <= n; aux++) {
      arr.push(arr[aux - 1] + arr[aux - 2]);
    }
    return arr;
  }

  runCalculations(n: number): Calculation {
    const isPair = this.evenNumber(n);
    const isPrime = this.primeNumber(n);
    const factorial = this.factorial(n);
    const sumN = this.addIntegers(n);
    const factors = this.factors(n);
    const fibonacci = this.fibonacciSerie(n);

    const resCal: Calculation = {
      factorial,
      factors,
      fibonacci,
      isPair,
      isPrime,
      sumN,
    };

    return resCal;
  }
}
