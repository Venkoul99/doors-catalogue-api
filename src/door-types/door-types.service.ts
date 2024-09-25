import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoorType } from './door-type.entity';

@Injectable()
export class DoorTypesService {
  constructor(
    @InjectRepository(DoorType)
    private readonly doorTypesRepository: Repository<DoorType>,
  ) {}

  findAll(): Promise<DoorType[]> {
    return this.doorTypesRepository.find();
  }

  findOne(id: number): Promise<DoorType> {
    return this.doorTypesRepository.findOneBy({ id });
  }

  async create(createDoorTypeDto: { name: string; description: string, image: string }): Promise<DoorType> {
    const newDoorType = this.doorTypesRepository.create(createDoorTypeDto);
    return this.doorTypesRepository.save(newDoorType);
  }
  
  async remove(id: number): Promise<void> {
    await this.doorTypesRepository.delete(id);
  }
}
