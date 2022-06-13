var mysql = require('mysql');

//membuat koneksi DB
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'secs',
});

conn.connect((err)=>{
    if(err)throw err;
    console.log('MySQL terkoneksi');
})

module.exports = conn;