# Shoe Store

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Running Locally](#running-locally)
  - [Docker Deployment](#docker-deployment)
  - [AWS Infrastructure Setup](#aws-infrastructure-setup)
  - [Example GraphQL Queries and Mutations](#example-graphql-queries-and-mutations)
- [Technologies](#technologies)
- [Roadmap](#roadmap)
- [License](#license)
- [Author](#author)

## Project Description

This project is a full-stack web application for managing a shoe store. It includes a backend built using AWS services (AppSync, DynamoDB, S3) and a frontend built with React (Next.js) and TypeScript. The application allows users to view a list of shoes, filter them by brand, and create orders. 

## Features

- Display a list of shoes with filtering by brand.
- Create orders with required shipping information.
- Serverless backend using AWS AppSync and DynamoDB.
- Frontend built with React (Next.js) and TypeScript.
- Global state management for the frontend data.
- Docker support for easy deployment.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- AWS CLI configured with appropriate permissions
- Docker

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Karl-Horning/nextjs-shoe-store
   cd nextjs-shoe-store
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running Locally

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Deployment

1. **Build the Docker image**:

   ```bash
   docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com --build-arg NEXT_PUBLIC_API_KEY=the-api-key -t shoe-store .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -e NEXT_PUBLIC_API_URL=https://api.example.com -e NEXT_PUBLIC_API_KEY=the-api-key -p 3000:3000 shoe-store
   ```

### AWS Infrastructure Setup

**CloudFormation Template**:

   Ensure you have a CloudFormation template (`cloudformation-template.yaml`) to provision the AWS resources.

   Deploy the CloudFormation stack:

   ```bash
   aws cloudformation create-stack --stack-name shoe-store-stack --template-body file://cloudformation-template.yaml --capabilities CAPABILITY_IAM
   ```

### GraphQL Schema

Ensure your GraphQL schema is uploaded to an S3 bucket and referenced in the CloudFormation template.

### Example GraphQL Queries and Mutations

- **Get All Shoes**:

  ```graphql
  query getAllShoes {
    listShoes {
      items {
        ShoeId
        AvailableSizes
        Brand
        Image
        Model
        Price
      }
    }
  }
  ```

- **Get Shoes by Brand**:

  ```graphql
  query getShoesByBrand($brand: String!) {
    listShoes(filter: { Brand: { eq: $brand } }) {
      items {
        ShoeId
        AvailableSizes
        Brand
        Image
        Model
        Price
      }
    }
  }
  ```

- **Create Order**:

  ```graphql
  mutation createOrder($client: String!, $shoe_id: String!, $size: String!, $shipping_info: String!) {
    createOrder(client: $client, shoe_id: $shoe_id, size: $size, shipping_info: $shipping_info) {
      order_id
      client
      shoe_id
      size
      shipping_info
      shoe {
        ShoeId
        Brand
        Model
        Price
        Image
      }
    }
  }
  ```

## Technologies

- [Python 3.9+](https://www.python.org): Python is a programming language that lets you work quickly
and integrate systems more effectively
- [AWS AppSync](https://aws.amazon.com/appsync/): Connect apps to data and events with secure, serverless, and performant GraphQL and Pub/Sub APIs
- [Lambda](https://aws.amazon.com/lambda/): Run code without thinking about servers or clusters
- [DynamoDB](https://aws.amazon.com/dynamodb/): Serverless, NoSQL, fully managed database with single-digit millisecond performance at any scale
- [Typescript](https://www.typescriptlang.org): Typescript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [React](https://react.dev): The library for web and native user interfaces
- [Next.js](https://nextjs.org/): The React Framework for the Web
- [NextUI](https://nextui.org/): Beautiful, fast and modern React UI library

## Roadmap

- (Complete) Create dummy data
- (Complete) Upload dummy data
- (Complete) Add instructions about automating upload of dummy data
- (Complete) Add GQL query to get list of shoes that can be filtered by brand
- (Complete) Add GQL mutation to create orders
- Generate JSON invoice file (order fields and shoe) and push it to S3 bucket
- Provide CloudFormation template or CDK script to provision the infrastructure and run the code
- (Complete) Use React to display list of shoes and allow filtering by brand from backend
- (Complete) Select shoes from list to create order (shipping info is required)
- (Complete) Implement global state to store data
- Deploy and host application from S3 bucket

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Karl Horning: [GitHub](https://github.com/Karl-Horning/) | [LinkedIn](https://www.linkedin.com/in/karl-horning/) | [CodePen](https://codepen.io/karlhorning) | [Portfolio](http://karl-horning.github.io)