const express = require('express')
const app = express()
const port = 3000

const config ={
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'

}

const mysql = require ('mysql')

const connection = mysql.createConnection(config)

const sql_drop_table = `DROP TABLE IF EXISTS people`

const sql_create_table = `CREATE TABLE IF NOT EXISTS people (
  name VARCHAR(20)
);`

const sql_insert = `INSERT INTO people(name) VALUES('Julio Santana');`

const sql_query = `SELECT * FROM people;`

connection.query(sql_drop_table)

connection.query(sql_create_table)

connection.query(sql_insert)

let response_query;

connection.query(sql_query, function(err, results, fields){
  if(results){
    response_query =Object.values(JSON.parse(JSON.stringify(results)));
  }
})



app.get('/', (req, res) => {
  res.send(`<p>Full Cycle Rocks!</p>
            <p>- Lista de nomes cadastrada no banco de dados.</p>
             ${response_query[0].name}`
          )
})



app.listen(port, ()=>{
    console.log('Rodando na porta '+ port)
})