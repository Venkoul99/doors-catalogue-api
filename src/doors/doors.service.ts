import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doors } from './door.entity';
import { DoorType } from '../door-types/door-type.entity';

@Injectable()
export class DoorsService {
  constructor(
    @InjectRepository(Doors)
    private readonly doorsRepository: Repository<Doors>,

    @InjectRepository(DoorType)
    private readonly doorTypesRepository: Repository<DoorType>,
  ) {}

  findAll(): Promise<Doors[]> {
    return this.doorsRepository.find();
  }

  findOne(id: number): Promise<Doors> {
    return this.doorsRepository.findOne({ where: { id } });
  }

  findAllByTypeId(id: number): Promise<Doors[]> {
    return this.doorsRepository.find({ where: { doorTypeId: id } });
  }

  async createOrUpdate(createDoorDto: { id?: number; name: string; price: number; salePrice?: number; image: string; doorTypeId: number; }): Promise<Doors> {
    const doorTypeId = createDoorDto.doorTypeId;

    const doorType = await this.doorTypesRepository.findOne({
        where: { id: doorTypeId },
    });

    if (!doorType) {
        throw new Error('Invalid door type');
    }

    let door: Doors;
    if (createDoorDto.id) {
        door = await this.doorsRepository.findOne({
            where: { id: createDoorDto.id },
        });

        if (!door) {
            throw new Error('Door not found');
        }
        door.name = createDoorDto.name;
        door.price = createDoorDto.price;
        door.salePrice = createDoorDto.salePrice;
        door.image = createDoorDto.image;
        door.doorTypeId = doorTypeId;

    } else {

        door = this.doorsRepository.create({
            name: createDoorDto.name,
            price: createDoorDto.price,
            salePrice: createDoorDto.salePrice,
            image: createDoorDto.image,
            doorTypeId: doorTypeId,
        });
    }

    return this.doorsRepository.save(door);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doorsRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Door not found');
    }
  }
}
