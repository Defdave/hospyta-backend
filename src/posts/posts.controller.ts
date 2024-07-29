import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: FilesService.storage(),
  //     fileFilter: FilesService.fileFilter,
  //   }),
  // )
  // async createPost(@Body() createPostDto: CreatePostDto, @Req() req, @UploadedFile() file) {
  //   const user = req.user;
  //   const imagePath = file ? file.filename : null;
  //   return this.postsService.create({ ...createPostDto, image: imagePath }, user);
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: FilesService.storage(),
      fileFilter: FilesService.fileFilter,
    }),
  )
  async createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() file) {
    const imagePath = file ? file.filename : null;
    return this.postsService.create({ ...createPostDto, image: imagePath });
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file: Multer.File,
  ) {
    if (file) {
      updatePostDto.image = file.filename;
    }
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @Patch(':id/upvote')
  async upvote(@Param('id') id: string) {
    return this.postsService.upvote(id);
  }

  @Patch(':id/downvote')
  async downvote(@Param('id') id: string) {
    return this.postsService.downvote(id);
  }
}