import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorsService } from './doors.service';
import { DoorsController } from './doors.controller';
import { Doors } from './door.entity';
import { DoorType } from '../door-types/door-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doors, DoorType])],
  providers: [DoorsService],
  controllers: [DoorsController],
})
export class DoorsModule {}
