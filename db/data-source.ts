import { DataSource, DataSourceOptions } from "typeorm";
import {dotenv} from 'dotenv'

export const dataSourceOptions:DataSourceOptions={
    type:'postgres',
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities:[],
    migration:[],
    logging:false,
    synchronize:false
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;