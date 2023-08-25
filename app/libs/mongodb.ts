import mongoose from 'mongoose';

// process.on('uncaughtException', function (err) {
//   console.log(err);
// });

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(
      process.env.DATABASE_URL! || 'mongodb://127.0.0.1:27017'
    );
    console.log('connected to mongodb');
  } catch (error) {
    console.log('error', error);
  }
};
