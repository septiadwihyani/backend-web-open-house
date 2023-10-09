import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HouseEntity } from './entities/house.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class HouseService {
  constructor(@InjectRepository(HouseEntity) private readonly houseRepository:Repository<HouseEntity>){}

  async create(createHouseDto: CreateHouseDto, currentUser: UserEntity):Promise<HouseEntity> {
    const house=this.houseRepository.create(createHouseDto);
    house.addedBy=currentUser;
    return await this.houseRepository.save(house);
  }

  async findHousesByPrice(price: number): Promise<HouseEntity[]> {
    return this.houseRepository.find({ where: { price } });
  }

  async findHousesByAddress(address: string): Promise<HouseEntity[]> {
    return this.houseRepository
      .createQueryBuilder('house')
      .where('LOWER(house.address) LIKE LOWER(:address)', { address: `%${address}%` })
      .getMany();
  }

  async update(id: number, updateHouseDto: UpdateHouseDto, currentUser: UserEntity): Promise<HouseEntity> {
    const house = await this.houseRepository.findOneBy({id});

    if (!house) {
      throw new NotFoundException(`House with ID ${id} not found.`);
    }

    if (updateHouseDto.title) {
      house.title = updateHouseDto.title;
    }
    if (updateHouseDto.description) {
      house.description = updateHouseDto.description;
    }
    if (updateHouseDto.price) {
      house.price = updateHouseDto.price;
    }
    await this.houseRepository.save(house);
    return house;
  }

  async remove(id: number): Promise<void> {
    const house = await this.houseRepository.findOneBy({id});
    if (!house) {
      throw new NotFoundException(`House with ID ${id} not found.`);
    }
    await this.houseRepository.remove(house);
  }
}
