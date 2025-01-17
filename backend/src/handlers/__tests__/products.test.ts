import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const res = await request(server).post('/api/products').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(5)
        
        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
        expect(res.body.errors).not.toHaveLength(10)
    })
    it('should validate that the price is greater than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Mouse - Testing',
            price: 0
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        
        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
        expect(res.body.errors).not.toHaveLength(10)
    })
    it('should validate that the price is a number and greater than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Mouse - Testing',
            price: 'test'
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)
        
        expect(res.status).not.toBe(201)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
        expect(res.body.errors).not.toHaveLength(10)
    })
    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Mouse - Testing',
            price: 10000
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')
        
        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('GET /api/products', () => {
    it('shoudl check if api/products irl exist', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        expect(res.body).not.toHaveProperty('errors')
        expect(res.body.data).not.toHaveLength(0)
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).get(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Producto no encontrado')
    })
    it('should check a valid ID in the URL' , async () => {
        const res = await request(server).get(`/api/products/not-valid-url`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')
    })
    it('get a JSON for a single product' , async () => {
        const res = await request(server).get(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

    })
})

describe('PUT /api/products/:id', () => {
    it('should check a valid ID in the URL' , async () => {
        const res = await (await request(server)
                .put(`/api/products/not-valid-url`)
                .send({
                    name: 'Monitor - testing',
                    availability: true,
                    price: 16000
                }))
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')
    }) 

    it('should display validation error messages when updating a product', async () => {
        const res = await request(server).put('/api/products/1').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(6)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })

    it('should validate that the price is greater than 0', async () => {
        const res = await request(server)
                    .put('/api/products/1')
                    .send({
                        name: 'Monitor - testing',
                        availability: true,
                        price: 0
                    })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('El precio del producto debe ser mayor a cero')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })
    it('should return a 404 for a non-existing product', async () => {
        const productId = 2000
        const res = await request(server)
                    .put(`/api/products/${productId}`)
                    .send({
                        name: 'Monitor - testing',
                        availability: true,
                        price: 30000
                    })
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('Producto no encontrado')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')

    })
    it('should updating a existing product with valid data', async () => {
        const res = await request(server)
                    .put(`/api/products/1`)
                    .send({
                        name: 'Monitor - testing',
                        availability: true,
                        price: 30000
                    })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('errors')

    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID', async () => {
        const res = await request(server).delete(`/api/products/not-valid-url`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID no válido')
    })
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).delete(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('Producto no encontrado')
        
        expect(res.status).not.toBe(200)
    })

    it('Should delete a product', async () => {
        const res = await request(server).delete(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toBe('Producto eliminado')
        
        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
    })
})