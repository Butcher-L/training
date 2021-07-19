import { Context } from 'mocha';
import Products from '../models/products';

export const addProduct = async(ctx,next) =>{
   
    const { id, name, price} = ctx.request.body;

    const decodedUsername = ctx.userName
 
    if(!id){
        ctx.throw(400, 'Id required');
    }
    if(!name){
        ctx.throw(400, 'Name required');
    }
    if(typeof name!=="string"){
        ctx.throw(400, 'Name must be string');
    }
    if(!price){
        ctx.throw(400, 'Price required');
    }
    if(typeof price!=="number"){
        ctx.throw(400, 'Price must be number');
    }
    const productExists = await Products.exists({id})  


    if(productExists){
        ctx.throw(400, 'Product already exist')
    }else{
        const res = await Products.create({ 
                id,
                name,
                price,
                createdBy:decodedUsername
            })
        ctx.status=200
        ctx.body={res}
    }
}

