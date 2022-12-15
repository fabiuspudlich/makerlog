var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const moment = require('moment')
const mariadb = require('mariadb');
/*const pool = mariadb.createPool({
     host: 'localhost:3306', 
     user:'fabiuspu_db_user', 
     password: '$gk3J52e7g0fja81218g',
     connectionLimit: 5
});*/

async function drinkCoffee() {
    /*let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }*/
  }

router.post('/increment-free-coaching-log', async (req, res) => {
    if (jwt.verify(req.body.access_token, SECRET_KEY)) {
        let decodedJWT = jwt.decode(req.body.access_token);
        //await drinkCoffee()
    } else {
        res.status(401).send("Server error!");
    }
});

module.exports = router;
