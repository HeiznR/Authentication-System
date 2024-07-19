import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtPayload';
import { ConfigService } from '@nestjs/config';
import { TokenType } from './token.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    protected configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<TokenType> {
    const { password, userName } = createUserDto;
    const _user = await this.userRepository.findOneBy({ userName });
    if (_user) {
      throw new ConflictException('user is already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.createUser({
      ...createUserDto,
      ...{ password: hashedPassword },
    });
    const payload: JwtPayload = { sub: user.id, userName: user.userName };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
    return { accessToken };
  }

  async logIn(userName: string, password: string): Promise<TokenType> {
    const user = await this.userRepository.findOneBy({ userName });
    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new NotFoundException('Wrong credentials');
    }
    const payload: JwtPayload = { sub: user.id, userName: user.userName };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
    return { accessToken };
  }
}
