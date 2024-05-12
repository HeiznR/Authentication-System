import { Injectable } from '@nestjs/common';
import { Subsciber, User } from 'src.graphql';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  createUser(name: string, surname: string): User {
    const user: User = { id: v4(), name, surname, subscribers: [] };
    this.users.push(user);
    return user;
  }

  addSubscriber(userId: string, name: string, surname: string): Subsciber {
    const user = this.users.find((user: User) => user.id === userId);
    if (user) {
      const subscriber = { name, surname };
      user.subscribers.push(subscriber);
      return subscriber;
    }
  }
}
