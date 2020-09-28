import { connect } from 'mongoose';

const dbInit = async () => {
  const connectionUrl = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

  try {
    await connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    throw new Error(error);
  }
}

export default dbInit;
