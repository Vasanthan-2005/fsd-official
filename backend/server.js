const express=require('express');
const app=express();
const db=require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/adduser',async(req,res)=>{
    const{f_name,l_name,emp_id,email,phone,dept,doj,role} = req.body;
    console.log(f_name,l_name,emp_id,email,phone,dept,doj,role);

    try{
        db.query('SELECT * FROM employees WHERE email=? OR emp_id=?',[email,emp_id],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(401).json({Message:"Error while validation of email"});
            }else if(result.length!=0){
                console.log("registered already");
                return res.status(401).json({Message:"Employee already Exists"});
            }else{
                db.query('INSERT INTO employees(f_name,l_name,emp_id,email,phone,dept,doj,role) VALUES(?,?,?,?,?,?,?,?)',[f_name,l_name,emp_id,email,phone,dept,doj,role],(err,result)=>{
                    if(err){
                        console.log("Error while adding employee:",err);

                    }else{
                        return res.status(200).json({Message:"Employee Added successfully"});
                    }
                })
            }
        })
    }catch(err){
        console.log(err);
        return res.status(401).json({Message:"Catched in adding users"});
    }
})

app.listen(5000,()=>(console.log("Running in 5000")));