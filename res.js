'use strict';

// memberi respon ok
exports.success = function(values , res){
    var data = {
        'status':200,
        'values':values
    };
     res.json(data);
     res.end();
}

//response fail
exports.error = function(values , res){
    var data = {
        'status':500,
        'values':values
    };
     res.json(data);
     res.end();
}
//response forbiden
exports.forbiden = function(values , res){
    var data = {
        'status':403,
        'values':values
    };
     res.json(data);
     res.end();
}

//respons untuk nested matakuliah
exports.okenested = function(values , res){
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key groupnya
        if(akumulasikan[item.nama]){
            // buatlah variable group nama mahasiswa
            const group = akumulasikan[item.nama];
            // cek jika isi array adalah nama matakuliah
            if(Array.isArray(group.matakuliah)){
                // tambahkan valuenya kedalam group matakuliah
                group.matakuliah.push(item.matakuliah)
            }else{
                group.matakuliah = [group.matakuliah , item.matakuliah];
            }
        }else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});
    var data = {
            'status':200,
            'values':hasil
        };
        res.json(data);
        res.end();
}
