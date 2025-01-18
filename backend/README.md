# Backend API for Product Management

This project provides a RESTful API for managing products.  It uses Node.js, Express.js, and PostgreSQL.

## Database

PostgreSQL is used as the database.  Database connection details are configured via environment variables (currently not included in the repository).

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Configure environment variables (database URL, etc.).
4.  Start the server: `npm start`
5. You can find the full documentation at: [http://localhost:4000/docs](http://localhost:4000/docs) when the server is running.

## API Endpoints

**Base URL:** `/api`

*   **GET /products:** Retrieve a list of all products.
*   **GET /products/:id:** Retrieve a specific product by ID.
*   **POST /products:** Create a new product.  Requires a JSON payload with product details (name and price).
*   **PUT /products/:id:** Update an existing product by ID. Requires a JSON payload with updated product details.
*   **PATCH /products/:id:** Update an availability of anexisting product by ID.
*   **DELETE /products/:id:** Delete a product by ID.

**Example Request (POST /products):**

```json
{
  "name": "New Product",
  "price": 99.99
}
```

**Responses:**  All API endpoints return JSON responses.  Success responses will have a `200 OK` status code. Error responses will include an appropriate status code and error message.  Specific error codes and responses will be documented in future updates.


## Technologies Used

*   Node.js
*   Express.js
*   PostgreSQL
*   Jest and Supertest for testing
*   Swagger for documentation

