import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorType } from './door-type.entity';
import { DoorTypesService } from './door-types.service';
import { DoorTypesController } from './door-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DoorType])],
  providers: [DoorTypesService],
  controllers: [DoorTypesController],
})
export class DoorTypesModule {}
