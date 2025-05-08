# Ecommerce Server

This repository contains the backend server for the Ecommerce application. It provides APIs for managing products, users, orders, and other functionalities required for the platform.

## Features

- User authentication and authorization
- Product catalog management
- Order processing and tracking
- Payment gateway integration
- RESTful API design
- Admin dashboard support
- Inventory management
- Email notifications for order updates

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.0 or later)
- A modern web browser for testing APIs

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/ecommerce-server.git
    cd ecommerce-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and configure the following:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Run tests (optional):
    ```bash
    npm test
    ```

## API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | /api/v1/product/get   | Fetch all products           |
| POST   | /api/v1/auth/login    | User login                   |
| POST   | /api/v1/order/create  | Create a new order           |
| PUT    | /api/v1/product/update| Update product details       |
| DELETE | /api/v1/product/delete| Delete a product             |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add a meaningful commit message"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License.