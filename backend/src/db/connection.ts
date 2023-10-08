import "reflect-metadata";
import { DataSource } from "typeorm";


export let appDataSoure = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Manaal12",
    database: "netflix-api",
    entities: ['src/entity/*{.ts,.js}'],
    synchronize: true,
    logging: true
});

// module.exports = appDataSoure