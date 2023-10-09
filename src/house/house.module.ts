import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { HouseEntity } from './entities/house.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([HouseEntity])],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [HouseService]
})
export class HouseModule {}
