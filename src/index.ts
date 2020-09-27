import app from './app/app';

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server runing under port ${process.env.APP_PORT || 3000}`)
});
