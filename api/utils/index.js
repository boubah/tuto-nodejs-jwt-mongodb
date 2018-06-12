'use strcit';
const jsonwebtoken = require("jsonwebtoken");

exports.json_web_token_handler = (req, res, next) => {
    if ((req.headers && req.headers.authorization) && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
};

const errorPredicate = err => (err);
exports.error_handlers = (err, res) => {
      if (errorPredicate(err)) {
          res.send(err);
        }
};