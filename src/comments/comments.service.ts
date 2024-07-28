// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ReplyCommentDto } from './dto/reply-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findByPostId(postId: Types.ObjectId): Promise<Comment[]> {
    return this.commentModel.find({ postId });
  }

  async replyToComment(replyCommentDto: ReplyCommentDto): Promise<Comment> {
    const { commentId, content, author } = replyCommentDto;
    const parentComment = await this.commentModel.findById(commentId).exec();
    if (!parentComment) {
      throw new Error('Comment not found');
    }
    const newComment: any = new this.commentModel({ content, author, postId: parentComment.postId });
    parentComment.replies.push(newComment._id);
    await parentComment.save();
    return newComment.save();
  }
}
