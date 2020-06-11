import { Injectable ,NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import{Model} from "mongoose";
import{Product} from "./products.model";
import { ProductsModule } from "./products.module";
import {GetProductDto} from './dto/getProductDto';
@Injectable()
export class ProductsService{
    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}     
    getHello1(): string {
        return 'Hello World........!';
      }
       //Create  service
    async  insertProduct( title:string,desc:string,price:number){
        const newProduct =  new this.productModel({
            title:title,
            description:desc,
            price:price
        })
      const product= await newProduct.save();
      return product.id as string;
        
    }
    //Fetch All service
    async  getProduct(){
        const product= await this.productModel.find().exec();
        return product as Product[];
    }

   async getProductFilter(filterdto:GetProductDto)  {
     const { status,search} =filterdto;
      let product=await this.getProduct();
      if(search){
        product=product.filter(product=> product.title === search);
      }
      return product;       
    }
    //Fetch single service
    async getSingleProduct(productID :string){
      //  const product =  await  this.productModel.findById(productID);
        const product =  await  this.productModel. findOne({_id: productID});
        if(!product){
            throw new NotFoundException("Product Not found");
        }
        return product;
    }
   //Fetch single service
    async getPost(postID): Promise<Product> {
        const post = await this.productModel
          .findById(postID)
          .exec();
        return post;
0      }
      // Edit service
      async editPost(postID :string, title:string,desc:string,price:number): Promise<Product> {
        const editedPost = await this.productModel.findById(postID);
        if(title){
          editedPost.title=title;
        }
        if(desc){
          editedPost.description=desc;
        }
        if(price){
          editedPost.price=price; 
        }
        editedPost.save();
        return editedPost;
      }
      
   // Delete service
   async deletePost(postID:string) {
        const result= await this.productModel.deleteOne({_id:postID}).exec();
        console.log(result)
        if(result.n === 0){
          throw new NotFoundException('Could not find product');
        }
          return 'Deleted successfully';
      }
     
      // private async findProduct(id:string):Promise<Product>{
      //   let product;
      //   try {
      //     const product =await this.productModel.findById(id);
      //   } catch (error) {
      //        throw new NotFoundException('Could not find product');
      //   }
        
      //   if(!product){
      //     throw new NotFoundException('Could not find product');
      //   }

      //   return product;
      //   // return {
      //   //   id:product.id,
      //   //   title:product.title,
      //   //   description:product.description,
      //   //   price:product.price
      //   // };
      // }
}