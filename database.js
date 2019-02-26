const mysql  = require('mysql')
const connection = mysql.createConnection({
    host: '172.17.0.2',
    user: 'root',
    password: 'password',
  });
  

  connection.connect(function(err) {
    if (err) {
        console.log('bruh')
    }else{
        console.log('connected');
    }
  });