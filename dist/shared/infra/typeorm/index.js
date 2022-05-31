import { createConnection } from "typeorm";
const connection = createConnection();
// Outra forma de conexão sem o arquivo de configuração
// import {DataSource} from 'typeorm';
// const AppDataSource = new DataSource({
//   "type": "postgres",
//   "host": "localhost",
//   "port": 5433,
//   "username": "postgres",
//   "password": "docker",
//   "database": "gostack_gobarber",
//   "migrations": [
//     "./src/database/migrations/*.ts"
//   ],
//   "cli": {
//     "migrationsDir": "./src/database/migrations"
//   }
// })
// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })
