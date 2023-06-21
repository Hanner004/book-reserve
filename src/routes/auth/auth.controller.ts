import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginWeb(@Body() data: LoginDto) {
    return await this.authService.loginWeb(data);
  }

  @Put('/update-password')
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return await this.authService.updatePassword(data);
  }
}
