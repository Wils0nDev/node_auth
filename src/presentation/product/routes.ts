import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class ProductRoutes {
    
    static get routes():Router {
        const router = Router();
        const productService = new ProductService()
        const controller = new ProductController(productService)
        router.get('/',[AuthMiddleware.validateJWT],controller.getProducts)
        router.get('/:id',[AuthMiddleware.validateJWT],controller.getProductById)
        router.post('/',[AuthMiddleware.validateJWT],controller.createProduct)

        return router;
    }
}