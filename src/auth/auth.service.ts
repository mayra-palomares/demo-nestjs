import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { User } from "@prisma/client";
@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async login(dto: AuthDto){
        const user: User = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        });

        if(!user){
            throw new ForbiddenException('User not found');
        }

        const passwordMatches = await argon.verify(user.password, dto.password);

        if(!passwordMatches){
            throw new ForbiddenException('Invalid password');
        }

        delete user.password;

        return user;
    }
    
    async signup(dto: AuthDto){
        const hash = await argon.hash(dto.password);

        try{
            const user: User = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash
                }
            })

            delete user.password;
            return user;
        }catch(error){
            if(error.code === 'P2002'){
                throw new ForbiddenException('The email is already in use.');
            }
            
            throw error;
        }
    }
}