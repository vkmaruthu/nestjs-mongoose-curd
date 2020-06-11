import { Controller, Get , Post , Body, Param,NotFoundException, Res,HttpStatus, Delete,Query,Patch} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {GetProductDto} from "../products/dto/getProductDto";
@Controller('products')
export class ProductsCortoller{
    constructor( private readonly productsService:ProductsService){}

    // Create a new product
    @Post()
    async addProduct(
     @Body('title') prodTitle:string,
     @Body('description') prodDesc:string,
     @Body('price') prodPrice:number    
    ){
    const generatedId=await this.productsService.insertProduct(prodTitle,prodDesc,prodPrice);
    return {id:generatedId}
    }
    // Fetching All product  
    @Get()
    async getAllProduct(@Query() filterdto:GetProductDto){
      console.log(filterdto);
      if(Object.keys(filterdto).length){
        return this.productsService.getProductFilter(filterdto);
      }else{
        const products=await this.productsService.getProduct();
        return products.map((prod)=>({id:prod.id,title:prod.title,description:prod.description,price:prod.price}));
      }
        
    }
    // Fetching single product  
    @Get(':id')
    async getProduct(@Param('id') prodId :string,){
        const products=await this.productsService.getSingleProduct(prodId);
       // return products.map((prod)=>({id:prod.id,title:prod.title,description:prod.description,price:prod.price}));
         return {id:products.id,title:products.title,description:products.description,price:products.price};
      }
    // Fetching single product  
    @Get('post/:postID')
    async getProduct1( @Res() res, @Param('postID') postID) {
      const post = await this.productsService.getPost(postID);
      if (!post) {
          throw new NotFoundException('Product does not exist!');
      }
      return res.status(HttpStatus.OK).json(post);
    }

    // Update a product using ID
    @Patch(':id')
   async updateProduct(
      @Param('id') prodId:string,
      @Body('title') prodTitle:string,
      @Body('description') prodDesc:string,
      @Body('price') prodPrice:number    

    ){
        const product = await  this.productsService.editPost(prodId,prodTitle,prodDesc,prodPrice);
           return product;
    }
  
  // Delete a product using ID
  @Delete(':id')
    async deleteProduct(@Param('id') prodId:string){
     const deletePost=await this.productsService.deletePost(prodId);
      return {"status":deletePost};
    
    }

  
}