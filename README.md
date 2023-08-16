# Bookmarks API

## Table of contents

- [General info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

Bookmarks API that allows users to manage bookmarks, including creating, retrieving, updating, and deleting bookmarks.

## Features

- User authentication: Users can create an account, log in, and authenticate their requests.
- CRUD operations: Users can perform CRUD (Create, Read, Update, Delete) operations on bookmarks.
- Database integration: The API uses a PostgreSQL database to store bookmarks and user information.

## Technologies

Project is created with:

- TypeScript
- NodeJS
- NestJS
- Prisma
- Passport JWT

## Setup

1. Install it locally using `npm install`
2. Create the DB and run the migrations using `npm run db:dev:restart`
3. Run the project using `npm run start:dev`
