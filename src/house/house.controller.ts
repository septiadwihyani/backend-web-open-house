import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { HouseEntity } from './entities/house.entity';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.SELLER]))
  @Post()
  async create(@Body() createHouseDto: CreateHouseDto, @CurrentUser() currentUser:UserEntity): Promise<HouseEntity> {
    return await this.houseService.create(createHouseDto, currentUser);
  }

  @Get('price/:price')
  async findByPrice(@Param('price') price: string): Promise<HouseEntity[]> {
    const parsedPrice = parseFloat(price); 
    return await this.houseService.findHousesByPrice(parsedPrice);
  }

  @Get('address/:address')
  async findByAddress(@Param('address') address: string): Promise<HouseEntity[]> {
    return await this.houseService.findHousesByAddress(address);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.SELLER]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto, @CurrentUser() currentUser: UserEntity): Promise<HouseEntity> {
    return await this.houseService.update(+id, updateHouseDto, currentUser);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.SELLER]))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.houseService.remove(+id);
    return { message:'House deleted successfully'};
  }
}
