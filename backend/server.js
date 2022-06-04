const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const { urlencoded } = require('express');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

// app.get('/api/notes/:id', (req, res) => {
//   res.json(notes.find(note => note.id === parseInt(req.params.id)));
// });

app.use('/api/users', userRouter);
app.use(notFound, errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});