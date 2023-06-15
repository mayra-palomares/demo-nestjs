import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { User } from "@prisma/client";
@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) {}

    login(dto: AuthDto){
        return {msg: 'I am logged in'}
    }
    
    async signup(dto: AuthDto){
        const hash = await argon.hash(dto.password);
        const user: User = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash
            }
        })

        delete user.password;
        return user;
    }
}