import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { 
            id: 1, 
            name: 'John Doe', 
            email: 'johndoe@me.you', 
            role: 'INTERN' 
        },
        { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'janesmith@me.you', 
            role: 'MANAGER' 
        },
        { 
            id: 3, 
            name: 'Alice Johnson', 
            email: 'alicejohnson@me.you', 
            role: 'DEVELOPER' 
        },
        { 
            id: 4, 
            name: 'Bob Brown', 
            email: 'bobbrown@me.you', 
            role: 'DESIGNER' 
        },
        { 
            id: 5, 
            name: 'Charlie White', 
            email: 'charliewhite@me.you', 
            role: 'TESTER' 
        },
        { 
            id: 6, 
            name: 'Diana Green', 
            email: 'dianagreen@me.you', 
            role: 'PRODUCT_OWNER' 
        },
        { 
            id: 7, 
            name: 'Ethan Black', 
            email: 'ethanblack@me.you', 
            role: 'SCRUM_MASTER' 
        }
    ]

    findAll(role?: 'INTERN' | 'MANAGER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) {
                throw new NotFoundException(`No users found with role ${role}`)
            }
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }

        return user
    }

    create(user: CreateUserDto) {
        const newUser = { 
            id: this.users.length + 1, 
            ...user 
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, userUpdate: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id)
        if (userIndex === -1) {
            return null
        }
        this.users[userIndex] = { ...this.users[userIndex], ...userUpdate }
        return this.users[userIndex]
    }

    delete(id: number) {
        const deletedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return deletedUser
    }
}
