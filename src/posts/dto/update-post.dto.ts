import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  content?: string;

  image?: string;

  @IsArray()
  categories?: string[];
}