
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignUp {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export class SignIn {
    email: string;
    password: string;
}

export class CreateUserInput {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export class Token {
    token: string;
}

export abstract class IMutation {
    abstract signUp(signUpDto: SignUp): Token | Promise<Token>;

    abstract signIn(signInDto: SignIn): Token | Promise<Token>;

    abstract createUser(createUserDto: CreateUserInput): User | Promise<User>;

    abstract deleteUser(userId: string): string | Promise<string>;
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

type Nullable<T> = T | null;
