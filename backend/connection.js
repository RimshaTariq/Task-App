const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'taskdb'
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in DB connection: '+JSON.stringify(err,undefined,2));
    }
    else{
        console.log('DB connected successfully');
    }
})
module.exports = mysqlConnection