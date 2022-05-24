import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routes/api/user.js';
import blogRouter from './routes/api/blog.js'


const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: `localhost${PORT}`,
    optionsSuccessStatus: 200
  };

  app.set('views', path.join('views'));
app.set('view engine', 'ejs')

  app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ 
    extended: false
}));

app.use(express.static('public'))
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

  app.listen(5000, () => console.log(`Serveris veikia ant ${PORT} porto.`));
