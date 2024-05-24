
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export class User {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract getUserById(userId: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(createUserDto: CreateUserInput): User | Promise<User>;

    abstract deleteUser(userId: string): string | Promise<string>;
}

type Nullable<T> = T | null;
