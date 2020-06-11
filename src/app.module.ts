import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [ProductsModule,
    MongooseModule.forRoot("mongodb://localhost:27017/sch_db1"),
    AuthModule,
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
