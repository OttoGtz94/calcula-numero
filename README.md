<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Calcular número

## Par, Primo, Factorial, Suma de todos los valores enteros de 1 a n, Factores, Fibonacci

#### Instalar

```javascript
yarn install
yarn start:dev
```

### Modo Desarrollo Docker

```javascript
docker compose up
```

Para cambiar el _puerto local_ primero crear el archivo **.env** desde el **.env.template** y modificar la variable **PORT**. La aplicación en la imagen corre por defecto en el puerto **3000**.

Una vez ejecutado podemos ir a **Postman** y hacer una petición tipo **POST** a _http://localhost:4200/calculate/5_.

![Captura-1](https://i.ibb.co/VwxqMmK/ss-1.png)

### Modo Producción Docker

Antes de ejecutar el comando cambiar en el archivo **.env** la variable _STAGE_ a **prod**

```javascript
docker compose -f docker-compose.prod.yml up
```

Al igual que en desarrollo podermos hacer una petición **POST** a _http://localhost:4200/calculate/5_ (ó el puerto que este en el archivo _.env_)
![Captura-1](https://i.ibb.co/wJKDw0Q/ss-2.png)

### Peticiones en Postman

Se crearon 2 maneras de hacer la petición

- Por **Params**

```typescript
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
```

En este caso la petición se hara mandando el _numero_ por los parametros de la _url_, sin olvidar que es una petición tipo **POST**.

> http://localhost:3000/calculate/10

- Por **Body**

```typescript
 @Post('')
  setNumberBody(@Body() n: SetNumberDto) {
    return this.calculateService.runCalculations(n.num);
  }
```

En el caso que sea body se hace la petición **POST** sin parametros

> http://localhost:3000/calculate

y en este caso mandamos el body por _raw_ tipo _json_.

```json
{
  "num": 5
}
```

Se hizo de ambas maneras con fines de demostración del uso de los diferentes **Decoradores** que tiene **NESTJS**. Quizas no era necesario hacer el **DTO** pero al igual se realizo para fines de demostración.

**Ambas formas manejan las posibles _Excepciones_ en caso que se envie algo diferente a un número entero positivo, esto con ayuda de diferentes _Decoradores_**
![Captura-1](https://i.ibb.co/LkSMKtw/ss-3.png)

Ó que el la propiedad no sea **num** o vayan más propiedades

![Captura-1](https://i.ibb.co/TbjLkKY/ss-4.png)

[Enlace a la imagen en Docker Hub](https://hub.docker.com/repository/docker/ottogtz94/calcula-numero-nest/general)
