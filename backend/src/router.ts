import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct, getProducts } from './handlers/products'
import { handleInputErrors } from './middlewares'

const router = Router()

// Routing
router.get('/', getProducts)
router.post('/',
    body('name')
        .isString().withMessage('El nombre del producto debe ser un string')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
        .isNumeric().withMessage('El precio del producto debe ser un numero')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio del producto debe ser mayor a cero'),
    handleInputErrors,
    createProduct

)
router.put('/', (req,res) =>{
    res.json('Desde PUT')
})
router.patch('/', (req,res) =>{
    res.json('Desde patch')
})
router.delete('/', (req,res) =>{
    res.json('Desde delete')
})


export default router