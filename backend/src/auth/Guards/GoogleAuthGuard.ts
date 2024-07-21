import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export interface GraphQLContext {
  req: Request;
  res: Response;
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private reflector: Reflector) {
    super();
  }
  //override getRequest to be compatabile with graphql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  getResponse(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().res;
  }
}
