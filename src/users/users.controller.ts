// users/users.controller.ts
import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Multer } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // @Post('profile-image')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: FilesService.storage(),
  //     fileFilter: FilesService.fileFilter,
  //   }),
  // )
  // async uploadProfileImage(@Req() req, @UploadedFile() file) {
  //   const user = req.user;
  //   const imagePath = file.filename;
  //   return this.usersService.updateProfileImage(user._id, imagePath);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(@UploadedFile() file: Multer.File) {
    return this.usersService.uploadProfileImage(file);
  }

  @Post()
  async create(@Body() User: CreateUserDto) {
    await this.usersService.create(User);
    return ('account created successful');
  }
}
