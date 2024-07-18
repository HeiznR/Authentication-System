import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.createQueryBuilder('user').getMany();
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.getUserById(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('error while user creation');
      return error;
    }
  }

  async deleteUser(id: string): Promise<string> {
    const res = await this.usersRepository.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`User with id: ${id} is not exist`);
    }
    return `user with id: ${id} deleted`;
  }
}
