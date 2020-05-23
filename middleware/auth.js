const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Отсутствует токен" });
  }

    try {
        jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
          if (error) {
            return res.status(401).json({ msg: "Token is not valid" });
          } else {
            req.user = decoded.user;
            next();
          }
        });
    } catch (err) {
        res.status(401).json({ msg: 'неправильный токен' })
    }
};
