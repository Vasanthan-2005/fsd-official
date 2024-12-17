const mysql = require("mysql2");

const dbconnect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"empmanage"
});

dbconnect.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("DB Connection succesfull");
    }
});

module.exports=dbconnect;
