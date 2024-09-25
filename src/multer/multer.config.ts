import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/^image\//)) {
      cb(new Error('Unsupported file type'), false);
    } else {
      cb(null, true);
    }
  },
};
