import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Hola mundo es lo que retorna',
  })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, {
    name: 'randomNumber',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromOneToTen',
  })
  getRandomFromOneToTen(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  @Query(() => Int, {
    name: 'randomFromOneTo',
    description: 'From one to argument TO (default 6)',
  })
  /**
   * Los arguments pueden ser nombrados y tipado desde el decorador, para el caso
   * del nombre, este no puede ser inferido, para el tipo graphql infiere un tipo
   * para el dato recibido
   */
  getRandomFromOneTo(
    @Args('to', { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }
}
