const fs = require('fs');
const config = require('config');

class FileService {
   createDir(req, file) {
      const filePath = this.getPath(req, file);
      console.log(filePath);
      return new Promise((resolve, reject) => {
         try {
            if (!fs.existsSync(filePath)) {
               fs.mkdirSync(filePath);
               return resolve({ message: 'File was created' });
            } else {
               return reject({ message: 'File already exists' });
            }
         } catch (e) {
            return reject({ message: 'File error: ' });
         }
      });
   }
   deleteFile(req, file) {
      const path = this.getPath(req, file);
      console.log(req);
      file.type === 'dir' ? fs.rmdirSync(path) : fs.unlinkSync(path);
   }
   getPath(req, file) {
      return req.filePath + '/' + file.user + '/' + file.path;
   }
}

module.exports = new FileService();
