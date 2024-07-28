// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';

interface JwtPayload {
    _id: string;
    email: string;
  }
  
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // // Hash the password
  // async hashPassword(password: string): Promise<string> {
  //   const saltRounds = 10;
  //   return await bcrypt.hash(password, saltRounds);
  // }

  // // Validate the password
  // async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  //   return await bcrypt.compare(password, hashedPassword);
  // }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout() {
    return { message: 'Logout successful' };
  }
}
