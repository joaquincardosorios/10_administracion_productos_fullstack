import { Request, Response} from 'express'
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.model'

export const getProducts = async (req: Request ,res: Response) => {
    const products = await Product.findAll(
        {
            order: [['id', 'DESC']],
            // limit: 2,
            attributes: {exclude: ['createdAt', 'updatedAt']}
        }
    )
    res.json({data: products})
}

export const getProductByID = async (req: Request ,res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product){
        res.status(404).json({error: 'Producto no encontrado'})
        return
    }
    res.json({data: product})
}

export const createProduct = async (req: Request ,res: Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})

}

export const updateProduct = async (req: Request ,res: Response) => {
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

    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req: Request ,res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product){
        res.status(404).json({error: 'Producto no encontrado'})
        return
    }
    
    // Actualizar el producto
    product.availability = !product.dataValues.availability

    await product.save()
    res.json({data: product})
}

export const deleteProductByID = async (req: Request ,res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product){
        res.status(404).json({error: 'Producto no encontrado'})
        return
    }
    
    // Eliminar el producto
    await product.destroy()
    res.json({data: 'Producto eliminado'})
}