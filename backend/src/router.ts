import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProductByID, getProductByID, getProducts, updateAvailability, updateProduct } from './handlers/products'
import { handleInputErrors } from './middlewares'

const router = Router()
/**
 * 
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: Product name
 *                      example: Monitor Curvo HP 42"
 *                  price: 
 *                      type: number
 *                      description: Product price
 *                      example: 129000
 *                  availability: 
 *                      type: boolean
 *                      description: Product availability
 *                      example: true
 * 
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of Products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 */


// Routing
router.get('/', getProducts)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Retuen a product base on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request - Invalid ID
 * 
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductByID
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 129000
 *          responses:
*              201:
 *                  descrption: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product' 
 *              400:
 *                  description: Bad request - Invalid input data    
 * 
 */

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

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Return the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 129000
 *                              availability:
 *                                  type: boolean
 *                                  example: false
 * 
 *          responses:
 *              200:
 *                  descrption: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'      
 *              400:
 *                  description: Bad request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product Not found
 * 
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .isString().withMessage('El nombre del producto debe ser un string')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
        .isNumeric().withMessage('El precio del producto debe ser un numero')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom( value => value > 0).withMessage('El precio del producto debe ser mayor a cero'),
    body('availability').isBoolean().withMessage('La disponibilidad del producto debe ser un booleano'),
    handleInputErrors,
    updateProduct
)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Updates product availability
 *          tags:
 *              - Products
 *          description: Return the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'      
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Product Not found
 * 
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags:
 *              - Products
 *          description: Return a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'    
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Product Not found
 * 
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProductByID
)


export default router