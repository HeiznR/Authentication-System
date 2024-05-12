
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
    subscribers: Nullable<Subsciber>[];
}

export class Subsciber {
    name: string;
    surname: string;
}

export abstract class IQuery {
    abstract getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
}

export abstract class IMutation {
    abstract createUser(name: string, surname: string): User | Promise<User>;

    abstract addSubscriber(userId: string, name: string, surname: string): Nullable<Subsciber> | Promise<Nullable<Subsciber>>;
}

type Nullable<T> = T | null;
