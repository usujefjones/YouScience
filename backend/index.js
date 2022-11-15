import express from 'express';
import bodyParser from 'body-parser';
import tasksRoutes from './routes/tasks.js';
import cors from 'cors';
//import cors_proxy  from 'cors-anywhere';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json());
// add this middleware to read post request body
app.use(express.text());

app.use(cors({ 
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'] ,
    credentials: true,
    "referrer-policy": "no-referrer-when-downgrade"
}));

app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => {
    res.send("Hello from the home page");
});


// cors_proxy.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(PORT, '127.0.0.1', () => console.log('Running CORS Anywhere'));

app.listen(PORT, () => console.log(`server running on port: http://localhost:${PORT}`));
