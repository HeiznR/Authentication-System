import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  surname: string;
  @ManyToMany(() => User, (user) => user.subscribers)
  @JoinTable()
  subscribers: User[];
}
