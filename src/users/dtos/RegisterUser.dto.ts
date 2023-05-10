import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  signature: string;
  @IsNotEmpty()
  message: string;
}
