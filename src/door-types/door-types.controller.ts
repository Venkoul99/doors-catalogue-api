import { Controller, Get, Param, Delete, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DoorTypesService } from './door-types.service';
import { DoorType } from './door-type.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../multer/multer.config';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('door-types')
export class DoorTypesController {
  constructor(private readonly doorTypesService: DoorTypesService) {}

  @Get()
  @Public()
  findAll(): Promise<DoorType[]> {
    return this.doorTypesService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<DoorType> {
    return this.doorTypesService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body() createDoorTypeDto: { name: string; description: string, image: string },
  ): Promise<DoorType> {
    return this.doorTypesService.create(createDoorTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doorTypesService.remove(+id);
  }
}
