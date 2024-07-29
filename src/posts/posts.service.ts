import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('comments').exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).populate('comments').exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<any> {
    const existingPost = await this.postModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true }
    );

    if (!existingPost) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return existingPost;
  }

  async delete(id: string): Promise<Post> {
    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return deletedPost;
  }

  async upvote(id: string): Promise<Post> {
    const post = await this.findOne(id) as PostDocument;
    post.upvotes += 1;
    return post.save();
  }

  async downvote(id: string): Promise<Post> {
    const post = await this.findOne(id) as PostDocument;
    post.downvotes += 1;
    return post.save();
  }
}