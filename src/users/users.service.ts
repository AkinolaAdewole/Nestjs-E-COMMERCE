import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import {hash} from 'bcrypt'
import { UserSignInDto } from './dto/user-signin.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto){
    const userExists= await this.findUserByEmail(userSignUpDto.email); 
    if(userExists) throw new BadRequestException('Email is not available');
    userSignUpDto.password = await hash(userSignUpDto.password,12)
    const user=this.usersRepository.create(userSignUpDto);
    return await this.usersRepository.save(user)
  }

  async signin(userSignInDto:UserSignInDto){
    const userExists= await this.findUserByEmail(userSignInDto.email); 
    if(userExists) throw new BadRequestException('Email is not available');  
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email:string){
    return await this.usersRepository.findOneBy({email:email})
  }
}
