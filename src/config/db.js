import mongoose from 'mongoose';

mongoose.connect(process.env.DB_MONGO)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));