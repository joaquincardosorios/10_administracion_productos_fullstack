import { Request, Response} from 'express'
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.model'

export const getProducts = async (req: Request ,res: Response) => {
    try {
        const products = await Product.findAll(
            {
                order: [['id', 'DESC']],
                limit: 2,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        )
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductByID = async (req: Request ,res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }
        res.json({data: product})
    } catch (error) {
        console.log(error)
        
    }
}

export const createProduct = async (req: Request ,res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (req: Request ,res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product){
            res.status(404).json({error: 'Producto no encontrado'})
            return
        }
        
        // Actualizar el producto
        product.name = req.body.name
        product.price = req.body.price
        product.availability = req.body.availability

        await product.update(product)
        await product.save()

        res.json({data: product})
    } catch (error) {
        console.log(error)
        
    }
}


