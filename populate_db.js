const conn = require("./db.js");

const createTables = async () => {
   const query = `CREATE TABLE PERSON (id SERIAL PRIMARY KEY, name VARCHAR ( 255 ) 
                    ,password VARCHAR ( 255 ),email VARCHAR ( 255 )) ;`;
   const res = await conn.query(query);
   console.log("done");
};
const createVehicles = async () => {
   const query = ` CREATE TABLE Vehicle (
    id SERIAL PRIMARY KEY,
        brand TEXT,
        model TEXT,
        ownerId INTEGER REFERENCES Person(id)
    );`;
   const res = await conn.query(query);
   console.log("done");
};
createVehicles();
