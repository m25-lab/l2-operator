import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import mongoose from 'mongoose';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: RegisterUserDto): Promise<User> {
    const digest = ethers.id(user.message);
    const address = ethers.recoverAddress(digest, user.signature);

    if (address != user.address) {
      return undefined;
    }

    return await this.userModel.create(user);
  }
}
