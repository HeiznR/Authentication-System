import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { signUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { signInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: signUpDto): Promise<{ token: string }> {
    const { email, name, password, surname } = signUpDto;
    const saltRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.userRepository.create({
      name,
      email,
      surname,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const token = this.jwtService.sign({ id: user.id }, { secret: 'test123' });
    return { token };
  }

  async signIn(signInDto: signInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: user.id }, { secret: 'test123' });
    return { token };
  }
}
