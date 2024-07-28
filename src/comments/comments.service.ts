import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find();
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true }).exec();
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  async delete(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndDelete(id).exec();
    if (!deletedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return deletedComment;
  }
}
