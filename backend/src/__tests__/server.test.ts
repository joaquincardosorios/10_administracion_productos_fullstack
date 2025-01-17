import request from 'supertest'
import server from '../server'
import { notDeepEqual } from 'assert'

describe('GET /api', () => {
    it('should return a json response', async () => {
        const res = await request(server).get('/api')
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toBe("desde api")
    })
})