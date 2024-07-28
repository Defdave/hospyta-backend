import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  async update(postId: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postModel.findByIdAndUpdate(postId, updatePostDto, {
      new: true,
    });
  }

  async delete(postId: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(postId);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }

  async findById(postId: string): Promise<Post> {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async upvote(postId: string): Promise<Post> {
    const post = await this.findById(postId);
    const userId = '1'

    if (post.upvotedBy.includes(userId)) {
      throw new BadRequestException('You have already upvoted this post');
    }

    if (post.downvotedBy.includes(userId)) {
      post.downvotedBy = post.downvotedBy.filter(id => id !== userId);
    }

    post.upvotedBy.push(userId);
    return post.save();
  }

  async downvote(postId: string): Promise<Post> {
    const post = await this.findById(postId);
    const userId = '1'

    if (post.downvotedBy) {
      throw new BadRequestException('You have already downvoted this post');
    }

    if (post.upvotedBy) {
      post.upvotedBy = post.upvotedBy.filter(id => id !== userId);
    }

    post.downvotedBy.push(userId);
    return post.save();
  }
}
