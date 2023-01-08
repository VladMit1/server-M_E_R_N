function filePath(path) {
   return function (req, res, next) {
      req.filePath = path;
      next();
      console.log(path);
   };
}
module.exports = filePath;
