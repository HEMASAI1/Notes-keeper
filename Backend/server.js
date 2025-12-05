const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


// connect db
connectDB(process.env.MONGODB_URI);


// routes
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res) => res.send('Notes Keeper API running'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));