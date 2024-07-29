// src/files/files.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private static readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  constructor() {
    if (!existsSync(FilesService.uploadPath)) {
      mkdirSync(FilesService.uploadPath, { recursive: true });
    }
  }

  static storage() {
    return diskStorage({
      destination: FilesService.uploadPath,
      filename: (req, file, cb) => {
        const filename = `${uuidv4()}-${file.originalname}`;
        cb(null, filename);
      },
    });
  }

  static fileFilter(req, file, cb) {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST), false);
    } else {
      cb(null, true);
    }
  }
}
