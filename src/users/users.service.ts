import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import {hash, compare} from 'bcrypt'
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    // Check if a user with the provided email already exists
    const userExists = await this.findUserByEmail(userSignUpDto.email);

    // If a user with the provided email already exists, throw a BadRequestException
    if (userExists) throw new BadRequestException('Email is not available');

    // Hash the password provided in the DTO
    userSignUpDto.password = await hash(userSignUpDto.password, 12);

    // Create a new user entity using the userSignUpDto
    let user = this.usersRepository.create(userSignUpDto);

    // Save the new user entity to the database
    return await this.usersRepository.save(user);
}


  
  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    // Query the database to find a user with the provided email
    const userExists = await this.usersRepository.createQueryBuilder('users')
        .addSelect('users.password') // Include the password field in the query result
        .where('users.email = :email', { email: userSignInDto.email }) // Filter users by email
        .getOne(); // Execute the query and get a single result
    
    // If no user is found with the provided email, throw a BadRequestException
    if (!userExists) throw new BadRequestException('Invalid Email or Password');
    
    // Compare the password provided in the DTO with the password stored in the database for the user
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    
    // If the passwords don't match, throw a BadRequestException
    if (!matchPassword) throw new BadRequestException('Invalid Email or Password');
    
    // If the passwords match, delete the password field from the user object (for security) before returning it
    delete userExists.password;
    
    // Return the user object
    return userExists;
}


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll():Promise<UserEntity[]> {
    return await this.usersRepository.find()
  }

  async findOne(id: number):Promise<UserEntity> {
   const user = await this.usersRepository.findOneBy({id});
   if(!user) throw new NotFoundException('User not found')
   return user;
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

  async accessToken(user:UserEntity):Promise<string>{
    return sign({id:user.id, email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }
}
