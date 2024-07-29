import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  readonly image?: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsArray()
  @ArrayNotEmpty()
  categories: string[];
}
