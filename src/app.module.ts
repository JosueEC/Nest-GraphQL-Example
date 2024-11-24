import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    /**
     * Este es el modulo de configuración de graphql para la raíz del proyecto
     *
     * El schema.gql es un archivo que se genera automáticamente, y al pasarlo en
     * la propiedad de autoSchemaFile esto cargara todo nuestro esquema de graphql
     * en el endpoint principal de nuestra aplicación
     */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      /**
       * * playground
       * Esta propiedad activa/desactiva el cliente de playground en el navegador
       * para poder enviar queries y mutaciones a nuestra aplicación, asi como
       * obtener el esquema gql de la misma
       */
      playground: false,
      /**
       * Este plugin del modulo de apollo server nos permite usar el cliente de Apollo
       * para poder usar nuestras queries y mutaciones, es una alternativa a playground
       */
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    HelloWorldModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
