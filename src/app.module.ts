import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoorType } from './door-types/door-type.entity';
import { Doors } from './doors/door.entity';
import { User } from './users/user.entity'
import { DoorsModule } from './doors/doors.module';
import { DoorTypesModule } from './door-types/door-types.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: 'admin',
      database: 'doors_db',
      entities: [Doors, DoorType, User],
      synchronize: true, //only for development
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DoorsModule,
    DoorTypesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
