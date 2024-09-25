import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { Doors } from './door.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Get()
  @Public()
  findAll(): Promise<Doors[]> {
    return this.doorsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Doors> {
    return this.doorsService.findOne(+id);
  }

  @Get('/type/:doorTypeId')
  @Public()
  findAllByTypeId(@Param('doorTypeId') doorTypeId: string): Promise<Doors[]> {
    return this.doorsService.findAllByTypeId(+doorTypeId);
  }

  @Post()
  create(@Body() createDoorDto: { id?: number; name: string; price: number; salePrice?: number, image: string; doorTypeId: number; }): Promise<Doors> {
    return this.doorsService.createOrUpdate(createDoorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doorsService.remove(+id);
  }
}
