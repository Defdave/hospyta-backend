import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(JwtAuthGuard)y
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':postId')
  async update(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(postId, updatePostDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async delete(@Param('postId') postId: string) {
    return this.postsService.delete(postId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':postId')
  async findById(@Param('postId') postId: string) {
    return this.postsService.findById(postId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':postId/upvote')
  async upvote(@Param('postId') postId: string, @Req() req: Request) {
    // const userId = req.user.userId;  // Extract the user ID from the JWT token
    return this.postsService.upvote(postId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post(':postId/downvote')
  async downvote(@Param('postId') postId: string, @Req() req: Request) {
    // const userId = req.user.userId;  // Extract the user ID from the JWT token
    return this.postsService.downvote(postId);
  }
}
