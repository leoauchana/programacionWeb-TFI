const express = require('express');
const morgan = require('morgan');
const routerStudents = require('./routes/studentsRoute');
const authRoute = require('./routes/auth.routes');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/setupModel');
require('dotenv').config();
//Settings
app.set('port',3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/api/students',routerStudents);
app.use('/api', authRoute);



app.use((req, res) => {
    res.send(`No se encontro tu pagina`);
});
//Connection
app.listen(app.get('port'));
console.log(`Connection in port ${app.get('port')}`);