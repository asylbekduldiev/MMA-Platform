import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mma-db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // replace with migrations in production
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    // FighterModule,
    // EventModule,
    // FightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
