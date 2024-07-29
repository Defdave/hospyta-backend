// src/files/files.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: FilesService.storage(),
      fileFilter: FilesService.fileFilter,
    }),
  )
  uploadFile(@UploadedFile() file) {
    return { filename: file.filename };
  }
}
