# FINAL CAPSTONE - PERIODIC TABLES RESTAURANT RESERVATION SYSTEM

This application is designed to manage the reservations and seating of a restaurant.  From the user's perspecive, you may add new tables, seat tables, finish tables, create new reservations, edit new reservations, and see both past and future reservations. The application also allows a user to search for reservations by phone number.

#### The technology used to create this application includes:
    -Javascript
    -React.js
    -Express.js
    -PostgresSQL
    -HTML
    -CSS
    -uniqid library
    -Bootstrap

#### API Documentation

###### RESERVATIONS
GET /reservations
GET /reservations?date=YYYY-MM-DD
POST /reservations
PUT /reservations/:reservation_id
PUT /reservations/reservation_id/status

###### TABLES

GET /tables
POST /tables
PUT /tables/:table_id/seat
DELETE /tables/:table_id/seat
#### Installation Instructions:

-Clone this repository into a new local folder.
-cd into the back-end directory and run npm install.
-cd into the front-end directory and run npm install.
-Create a new local instance of the program from the root directory with npm run start:dev .

