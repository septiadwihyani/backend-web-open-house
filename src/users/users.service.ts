import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserRolesDto } from './dto/update-userroles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { Roles } from 'src/utility/common/user-roles.enum';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity> {
    const userExists=await this.findUserByEmail(userSignUpDto.email);
    if(userExists) throw new BadRequestException('Email is not available');
    userSignUpDto.password=await hash(userSignUpDto.password, 10);
    const user=this.usersRepository.create(userSignUpDto);
    return await this.usersRepository.save(user);
  }

  async signin(userSignInDto:UserSignInDto):Promise<UserEntity> {
    const userExists=await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email', {email:userSignInDto.email}).getOne();
    if(!userExists) throw new BadRequestException('Bad credentials');
    const matchPassword=await compare(userSignInDto.password, userExists.password);
    if(!matchPassword) throw new BadRequestException('Bad credentials');
    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user=await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserRoles(id: number, roles: Roles[]): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.roles = roles;
    await this.usersRepository.save(user);
    return user;
  }

  async findUserByEmail(email:string) {
    return await this.usersRepository.findOneBy({email});
  }

  async accessToken(user:UserEntity): Promise<string> {
    return sign({id:user.id, email:user.email}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }
}
