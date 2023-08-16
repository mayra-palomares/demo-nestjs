import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, SignUpDto } from "./dto";
import * as argon from "argon2";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async login(dto: LoginDto) {
        const user: User = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const passwordMatches = await argon.verify(user.password, dto.password);

        if (!passwordMatches) {
            throw new ForbiddenException('Invalid password');
        }
        return this.signToken(user.id, user.email);
    }

    async signup(dto: SignUpDto) {
        const hash = await argon.hash(dto.password);

        try {
            const user: User = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            })

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('The email is already in use.');
            }

            throw error;
        }
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret: this.config.get('JWT_SECRET') })
        return {
            access_token: token
        }
    }
}