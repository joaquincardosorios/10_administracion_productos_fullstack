import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductByID, getProducts, updateAvailability, updateProduct } from './handlers/products'
import { handleInputErrors } from './middlewares'

const router = Router()

// Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductByID)
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
router.put('/:id', 
    body('name')
        .isString().withMessage('El nombre del producto debe ser un string')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
        .isNumeric().withMessage('El precio del producto debe ser un numero')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio del producto debe ser mayor a cero'),
    body('availability').isBoolean().withMessage('La disponibilidad del producto debe ser un booleano'),
    handleInputErrors,
    updateProduct)

router.patch('/:id', updateAvailability)
router.delete('/', (req,res) =>{
    res.json('Desde delete')
})


export default router