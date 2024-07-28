const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sanjana@2001',
    database:'auth_app'
});

connection.connect((err)=>{
    if(err){
        console.error('error connecting to mysql',err.stack);
        return;
    }
    console.log('connected to mysql');
})

module.exports = connection
