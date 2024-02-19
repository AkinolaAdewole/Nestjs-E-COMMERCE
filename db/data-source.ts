import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions:DataSourceOptions={
    type:'postgres',
    host:'localhost',
    port: 5432,
    username: 'postgres',
    password: '54321',
    database: 'ecommerce-nest',
    entities:[],
    migration:[],
    logging:false,
    synchronize:false
}

const dataSource = new DataSource(dataSourceOptions);