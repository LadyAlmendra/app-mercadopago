import mongoose from 'mongoose';

mongoose.connect(process.env.DB_MONGO)
    .then(() => console.log('LADY_TOXIC_APP Database Connected'))
    .catch((err) => console.log(err));