import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
// Import route modules
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();
const port = process.env.PORT || 3000;



app.use(cookieParser())
app.use(bodyParser.json());
// incase you having errors concerning cors bruhhh
// uncomment this area
// app.use(cors(({
//     credentials: true,
//     origin: [
//         "http://localhost:3000",
//     ],
// })));
app.use(cors());
app.use('/api/', userRoutes, loanRoutes);

// i don't know why i did this oo mannns
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });

})

