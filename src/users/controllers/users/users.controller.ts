import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async userRegister(@Body() userData: RegisterUserDto) {
    const createdUser = await this.userService.create(userData);

    if (createdUser != undefined) {
      return createdUser;
    } else {
      return {
        error: 'Signature is not correct',
      };
    }
  }
}
