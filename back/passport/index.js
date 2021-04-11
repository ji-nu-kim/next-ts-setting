const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 유저정보를 다 갖고 있으면 서버의 부담이 커지기때문에 cookie와 매칭할 아이디만 저장함
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // 유저정보가 필요할 때 아이디를 통해 서버에서 유저정보를 찾는다
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
