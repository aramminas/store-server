# Instructions for connecting with the database

I. Create a Postgres database and add all connection information to the .env file.
(You can get all the necessary variables from the .env.example file.)
II. Run the following commands

1. npm run migrate
2. npm run dev

# For deploy migrations

`npm run migrate`

## For Migrations start

<!-- create first migration -->

`npx prisma migrate dev --name create_tableName_table init`

<!-- create new migration -->

`npx prisma migrate dev --name create_tableName_table`

<!-- run migration -->

`npm run migrate`

# For database management

`npx prisma studio`
