import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop()
  category: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // @Prop()
  // userId: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ default: [] })
  upvotedBy: string[];

  @Prop({ default: [] })
  downvotedBy: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
