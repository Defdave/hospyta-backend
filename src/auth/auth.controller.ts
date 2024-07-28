import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginDto, @Res() res: Response): Promise<any> {
    const user = await this.authService.validateUser(login.email, login.password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = await this.authService.login(user);
    res.cookie('access_token', token, { httpOnly: true, secure: true });
    return res.json({ message: 'Login successful' });
  }

  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout();
  }
}
