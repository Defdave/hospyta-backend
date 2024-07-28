// src/comments/comments.controller.ts
import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ReplyCommentDto } from './dto/reply-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('post/:postId')
  async findByPostId(@Param('postId') postId: any) {
    return this.commentsService.findByPostId(postId);
  }

  @Post('reply')
  // @UseGuards(JwtAuthGuard)
  async replyToComment(@Body() replyCommentDto: ReplyCommentDto) {
    return this.commentsService.replyToComment(replyCommentDto);
  }
}
