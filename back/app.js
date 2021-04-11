const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => console.log('db 연결 성공'))
  .catch(err => console.error(err));
passportConfig();

app.use(
  cors({
    origin: true,
    credentials: false,
  })
);
// json형식을 처리해서 req.body에 넣어줌
app.use(express.json());
// form(urlencoded)을 처리해서 req.body에 넣어줌
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
