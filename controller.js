'use strict';

var response    = require( './res');
var connection  = require('./koneksi');

// mengecek apakah restAPI berjalan
exports.index = function (req, res){
    response.success("Aplikasi Rest API berjalan", res)
};
// menampilkan data mahasiswa dari DB
exports.showMahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa' , function(error, rows , fields){
        if(error){
            response.error('Data gagal di tambahkan', res);
        }
        else{
            response.success(rows, res);
        }
    });
};
// menampilkan mahasiswa berdasarkan ID 
exports.showMahasiswaId = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?',[id],
        function(error, rows , fields){
            if(error){
                response.error('Data gagal di tambahkan', res);
            }
            else{
                response.success(rows, res)
            }
        });
};
// menambahkan data mahasiswa
exports.addMahasiswa = function(req,res){
    var nim     = req.body.nim;
    var nama    = req.body.nama;
    var mata_kuliah = req.body.mata_kuliah;
    // atau const { nim, nama, mata_kuliah } = req.body;
    connection.query('INSERT INTO mahasiswa (nim, nama , mata_kuliah) VALUES(?,?,?)',
            [nim, nama , mata_kuliah],
        function(errors , rows , fields){
            if(errors){
                response.error('Data gagal di tambahkan', res);
            }
            else{
                response.success('Berhasil menambahkan data', res);
            }
        }
    );
}
// mengubah data berdasarkan ID mahasiswa
exports.updateMahasiswa = function(req,res){
    var id      = req.body.id_mahasiswa;
    var nim     = req.body.nim;
    var nama    = req.body.nama;
    var mata_kuliah = req.body.mata_kuliah;

    connection.query('UPDATE mahasiswa SET nim=? ,  nama=? , mata_kuliah=? WHERE id_mahasiswa=?',[ nim, nama , mata_kuliah ,id], //berurutan
        function(errors, rows, fields){
            if(errors){
                response.error('Data gagal di tambahkan', res);
            }
            else{
                response.success('Data berhasil di ubah',res);
            }
        }
    );
}
// menghapus mahasiswa berdasarkan id
exports.deleteMahasiswa = function(req, res){
    var id      = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',[id],
        function(errors, rows, fields){
            if(errors){
                console.log(errors);
            }
            else{
                response.success('Data berhasil di hapus!!',res);
            }
        }
    );
}
exports.tampilGroupMatakuliah = function(req , res){
    connection.query('SELECT dosen.id_dosen, dosen.mata_kuliah , dosen.nama , dosen.nip , matakuliah.jadwal_matakuliah FROM matakuliah JOIN dosen WHERE matakuliah.id_matakuliah = dosen.id_dosen ORDER BY dosen.mata_kuliah;',
        function(errors , rows , fields){
            if(errors){
                console.log(errors);
            }
            else{
                response.okenested(rows,res);
            }
        }
    )

}
