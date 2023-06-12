import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) {}

    login(){
        return {msg: 'I am logged in'}
    }
    
    signup(){
        return {msg: 'I am signed up'}
    }
}