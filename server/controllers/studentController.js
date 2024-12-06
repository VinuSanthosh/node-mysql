const mysql = require('mysql');
const dontenv = require('dotenv');
const logger = require('../controllers/logger');
dontenv.config();
const con = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    database        : process.env.DB_NAME
});

exports.view=(req, res)=>{
    con.getConnection((err, connection)=>{
        if(err) throw err
        connection.query("select * from users",(err, rows)=>{
            connection.release();
            if(!err){
                //console.log(rows);
                res.render("home", {rows});
            } else{
                console.log('error in :'+ err)
            }
        });
    })
}

exports.addUser=(req, res)=>{
    res.render("addUser");
}

exports.save = (req, res) =>{
    con.getConnection((err, connection)=>{
        const {name, age, city} = req.body;
        if(req.body.name|| req.body.age || req.body.city == '') {
            res.render("addUser",{msg :'Please fill the details!'});
            logger.studentLogger.log('info', 'Please fill the details!');
            return;           
        }
      
        if(err) throw err
        connection.query("insert into users(Name, Age, City) values(?,?,?)",[name, age, city],(err, rows)=>{
            connection.release();
            if(!err){
                //console.log(rows);
                res.render("addUser",{msg :'User added successfully!'});
            } else{
                console.log('error in :'+ err)
            }
        });
    }) 
}