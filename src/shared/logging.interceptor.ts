import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const body = request.body;
    const url = request.url;
    const now = Date.now();

    const logBody = (body: any, url: string) => {
      if (!body || !Object.keys(body).length) {
        return `no request body`;
      } else {
        delete body.password;
        if (url === '/auth/sign-in') {
          return `request_body : ${JSON.stringify(body)}`;
        } else if (url === '/auth/sign-up') {
          return `request_body : ${JSON.stringify(body)}`;
        } else {
          return `request_body : ${JSON.stringify(body)}`;
        }
      }
    };

    const logSignedUser = user => {
      if (!user || !Object.keys(user).length) {
        return `no signed user`;
      }
      return `signed user : ${user.id}`;
    };

    const logQueryParams = query => {
      if (!query || !Object.keys(query).length) {
        return `no query params`;
      }
      return 'query_params : ' + JSON.stringify(query);
    };

    const logRouteParams = params => {
      if (!params || !Object.keys(params).length) {
        return `no route params`;
      }
      return 'route_params : ' + JSON.stringify(params);
    };

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} | ${url} | ${logSignedUser(
            request.user,
          )} | ${logQueryParams(request.query)} | ${logRouteParams(
            request.params,
          )} | ${logBody(body, url)} | ${Date.now() - now}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
