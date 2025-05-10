import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FighterModule } from './modules/fighter/fighter.module';
import { EventModule } from './modules/event/event.module';
import { FightModule } from './modules/fight/fight.module';
import { RankingModule } from './modules/ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'mma',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true, // replace with migrations in production
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    FighterModule,
    EventModule,
    FightModule,
    RankingModule,
  ],
})
export class AppModule {}
