import { 
    Controller, 
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
    HttpCode,
    BadRequestException,
    Query,
    ParseIntPipe,
    NotFoundException
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        const user = this.usersService.create(createUserDto);
        if (!user) {
            throw new NotFoundException('Erreur lors de la création de l\'utilisateur');
        }
        return user;
    }

    @Get()
    @HttpCode(200)
    findAll(@Query('role') role?: string) {
        const user = this.usersService.findAll(role?.toUpperCase() as 'USER' | 'ADMIN');
        if (!user) {
            throw new NotFoundException('Erreur lors de la récupération de l\'utilisateur');
        }
        return user;
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException('Erreur lors de la récupération de l\'utilisateur');
        }
        return user;
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const user = this.usersService.update(id, updateUserDto);
        if (!user) {
            throw new NotFoundException('Erreur lors de la mise à jour de l\'utilisateur');
        }
        return user;
    }

    @Delete(':id')
    @HttpCode(200)
    remove(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.remove(id);
        if (!user) {
            throw new NotFoundException('Erreur lors de la suppression de l\'utilisateur');
        }
        return user;
    }


}
