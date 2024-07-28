// posts/dto/create-post.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content',
    example: 'content'
  })
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The image of the content',
    example: 'Pic'
  })
  image?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category',
    example: 'art'
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The author',
    example: 'john_doe'
  })
  author: string;

  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  upvotes: number;

  @IsString()
  @IsNotEmpty()
  downvotes: number;

  @IsString()
  @IsNotEmpty()
  viewCount: number;
}
