import { HttpStatus, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from 'generated/prisma/runtime/library';

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost): void {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: MyResponseObj = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: exception.message || exception.response || {},
        };

        this.logger.error(responseBody);
        response.status(status).json(responseBody);

        this.logger.error(responseBody.response, AllExceptionsFilter.name)

        super.catch(exception, host)
    }
}