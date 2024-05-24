import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder('user').getMany();
  }
  async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, surname, email, password } = createUserDto;
    const user: User = this.usersRepository.create({
      name,
      surname,
      email,
      password,
    });
    const response = await this.usersRepository.save(user);
    return response;
  }

  async deleteUser(userId: string): Promise<string> {
    const res = await this.usersRepository.delete(userId);
    if (!res.affected) {
      throw new NotFoundException(`User with id: ${userId} is not exist`);
    }
    return `user with id: ${userId} deleted`;
  }
}
