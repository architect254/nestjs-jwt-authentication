import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'bada',
  password: 'password',
  database: 'ideas',
  synchronize: true,
  logging: true,
  entities: [__dirname + '../../**/*.entity.{ts,js}'],
};
