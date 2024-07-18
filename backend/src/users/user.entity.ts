import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  userName: string;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
