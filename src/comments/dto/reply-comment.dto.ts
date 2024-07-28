// src/comments/dto/reply-comment.dto.ts
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class ReplyCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsMongoId()
  author: string;
}
