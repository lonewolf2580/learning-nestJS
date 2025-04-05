import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    @Get() // /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'MANAGER' | 'ADMIN') {
        return []
    }

    @Get(':id') // /users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }

    @Post() // /users
    create(@Body() user: { name: string }) {
        return user
    }

    @Patch(':id') // /users/:id
    update(@Param('id') id: string, @Body() userUpdate: { name: string }) {
        return { id, ...userUpdate }
    }

    @Delete(':id') // /users/:id
    delete(@Param('id') id: string) {
        return { id }
    }
}
