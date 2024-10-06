import { status } from '@grpc/grpc-js';
import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

export class GrpcException extends RpcException {
  constructor(private readonly code?: status, message?: string) {
    super({ code, message });
  }
}

@Catch()
export class GrpcExceptionsFilter implements RpcExceptionFilter {
  catch(exception: { code?: status; message?: string }): Observable<never> {
    let grpcError;

    if (exception.code) {
      grpcError = {
        code: exception.code,
        message: exception.message,
      };
    } else {
      grpcError = {
        code: status.INTERNAL,
        message: 'Internal server error',
      };
    }

    return throwError(() => grpcError);
  }
}
