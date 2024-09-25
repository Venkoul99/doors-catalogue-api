import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.userId };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: 10_000_000});
    return {
      access_token: accessToken,
    };
  }
}
