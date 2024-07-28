import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: String, ref: 'Post', required: true })
  postId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
