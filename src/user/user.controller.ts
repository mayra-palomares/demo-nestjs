import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get("me")
    getAuthenticatedUser() {
        return this.userService.getAuthenticatedUser();
    }
}
