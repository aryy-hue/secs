var connection = require('../koneksi');
var mysql      = require('mysql');
var md5        = require('MD5');
var response    = require('../res');
var jwt        = require('jsonwebtoken');
var config     = require('../config/secret');
var ip         = require('ip');
const { connect } = require('../koneksi');


// controller untuk register
exports.register = function(req,res){
   
    var post = {
        nama: req.body.nama,
        nip: req.body.nip,
        matkul: req.body.matkul,
        role: req.body.role,
        username: req.body.username,
        password: md5(req.body.password),
        
      
   }

   var query = "SELECT nip FROM ?? WHERE ??=?";
   var table = ["dosen", "nip", post.nip];
    
   query = mysql.format(query, table);

    connection.query(query , function(errors , rows){
        if(errors){
            console.log(errors);
        }else{
            if(rows.length  == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["dosen"];
                query = mysql.format(query,table);
                connection.query(query , post ,function(errors , rows){
                    if(errors){
                        console.log(errors).res.Status(402);
                    }else{
                        response.success("Berhasil menambahkan user baru!!",res)
                    }
                });
            }
            else{
                response.success("NIP sudah terdaftar!",res);
            }
        }
    })
}
// controller untuk login
exports.login = function(req,res){
    var post ={
        username: req.body.username,
        password: req.body.password
    }
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["dosen","username",post.username, "password",md5(post.password)];

    query = mysql.format(query,table);
    connection.query(query,function(errors,rows){
        if(errors){
            console.log(errors);
        }else{
            if(rows.length ==1){
                var token = jwt.sign({rows},config.secret,{
                    expiresIn: 1440
                });
                id_user = rows[0].id;

                var data={
                    id_user: id_user,
                    access_token: token,
                    ip_address:ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table =["akses_token"];

                query = mysql.format(query, table);
                connection.query(query,data,function(errors,rows){
                    if(errors){
                        console.log(errors);
                    }else{
                        res.json({
                            success:true,
                            message:"Token JWT tergenerate",
                            token:token,
                            curUser:data.id_user,
                            // tambahkan user
                            // user:username
                        });
                    }
                });
            }else{
                res.json({
                    "Status":402,
                    "Message":"Email atau password salah"
                });
            }
        }
    });
}
exports.halamanrahasia = function(req,res){
    response.success('Halaman ini hanya untuk user dengan role = 2!',res);
}