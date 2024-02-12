import express from 'express';
import cors from 'cors';
import { connect } from './db/mongoDB.js';
import taskRoutes from './routes/taskRoutes.js';
import { PORT } from './config/config.js';

connect().then(() => {
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use('/api', taskRoutes);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });    
}).catch((err) => {
    console.log(`Failed to start the server. ${err}`)
}); 

