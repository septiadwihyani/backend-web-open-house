import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserRolesDto } from './dto/update-userroles.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignUpDto:UserSignUpDto):Promise<{user: UserEntity}> {
    return {user: await this.usersService.signup(userSignUpDto)};
  }

  @Post('signin')
  async signin(@Body() userSignInDto:UserSignInDto): Promise<{accessToken: string; user: UserEntity;}> {
    const user=await this.usersService.signin(userSignInDto);
    const accessToken=await this.usersService.accessToken(user);
    return{accessToken, user};
  }

  @Get('all')
  async findAll(): Promise<UserEntity[]> { 
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch('roles/:id')
  async updateUserRoles(@Param('id') id: number, @Body() roles: Roles[]) {
    return this.usersService.updateUserRoles(id, roles);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me') 
  getProfile(@CurrentUser() currentUser:UserEntity) {
    return currentUser;
  }
}
