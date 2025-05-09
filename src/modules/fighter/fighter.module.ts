import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Fighter } from '../../entities/fighter.entity';
// import { FighterResolver } from './fighter.resolver';
// import { FighterService } from './fighter.service';

@Module({
    imports: [TypeOrmModule.forFeature([Fighter])],
    providers: [FighterResolver, FighterService],
})
export class FighterModule {}
