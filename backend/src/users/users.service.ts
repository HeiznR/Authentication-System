import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribers', 'subscriber')
      .getMany();
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribers', 'subscriber')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  async createUser(name: string, surname: string): Promise<User> {
    const user: User = this.usersRepository.create({
      name,
      surname,
      subscribers: [],
    });
    const response = await this.usersRepository.save(user);
    return response;
  }

  async addSubscriber(userId: string, subId: string): Promise<User> {
    const user = await this.getUserById(userId);
    const subscriber = await this.getUserById(subId);
    user.subscribers.push(subscriber);
    await this.usersRepository.save(user);
    return user;
  }
}
