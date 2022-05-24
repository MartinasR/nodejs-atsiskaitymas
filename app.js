import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import register from './routes/api/register.js';
import login from './routes/api/login.js';
import homePage from './routes/ui/homepage.js';
import { engine } from 'express-handlebars';
import registerPage from './routes/ui/registerPage.js';
import loginPage from './routes/ui/loginPage.js';


const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: `localhost${PORT}`,
    optionsSuccessStatus: 200
  };

  app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



/*app.get('/jwt', (req, res) => {
  const privateKey = process.env.SECRET_JWT_TOKEN;
  const token = jwt.sign({"raktoVardas":"duomenys"}, privateKey, { expiresIn: '1m'});
  res.send(token);
});*/

  app.use(express.static(path.resolve('public')))
  app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ 
    extended: false
}));

app.use('/', homePage)
app.use('/login', loginPage)
app.use('/register', registerPage)
app.use('/api/login', login)
app.use('/api/register', register)

  app.listen(5000, () => console.log(`Serveris veikia ant ${PORT} porto.`));
