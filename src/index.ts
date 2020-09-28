import app from './app/app';
import dbInit from './database/database';

async function main() {
  try {
    await dbInit();
    console.log('Database runing.');
  
    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server runing under port ${process.env.APP_PORT || 3000}`)
    });
    
  } catch (error) {
    console.log('Application connection error', error)
  }
}

main();
