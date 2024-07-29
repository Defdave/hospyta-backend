// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Multer } from 'multer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  // async updateProfileImage(userId: string, imagePath: string): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(userId, { profileImage: imagePath }, { new: true }).exec();
  // }

  async uploadProfileImage(file: Multer.File) {
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }

  async create(User: CreateUserDto): Promise<UserDocument> {
    const res = await this.userModel.create(User)
    return res;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
}
