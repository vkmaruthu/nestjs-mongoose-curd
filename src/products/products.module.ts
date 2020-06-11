import { Module ,NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ProductsCortoller } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './products.model';

import { AuthenticationMiddleware  } from "../common/authentication.middleware";
@Module({
    imports:[
        MongooseModule.forFeature([{
          name:"Product",schema:ProductSchema
        }])
      ],
    controllers:[ProductsCortoller],
    providers:[ProductsService]
})
export class ProductsModule  {
//export class ProductsModule implements  NestModule {
  // configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
  //   consumer.apply(AuthenticationMiddleware).forRoutes(
  //     { method: RequestMethod.POST, path: '/products' },
  //     { method: RequestMethod.PATCH, path: '/products/:id' },
  //     { method: RequestMethod.DELETE, path: '/products/:id' }
  //   )
  // }
}