
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    name: string;
    surname: string;
    subscribers: Nullable<Subscriber>[];
}

export class Subscriber {
    id: string;
    name: string;
    surname: string;
}

export abstract class IQuery {
    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract getUserById(userId: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createUser(name: string, surname: string): User | Promise<User>;

    abstract addSubscriber(userId: string, subId: string): User | Promise<User>;
}

type Nullable<T> = T | null;
