'use strict';

module.exports = function(app){
    var jsonku = require('./controller');//mengambil class dari controller
    app.route('/')
        .get(jsonku.index);
    app.route('/tampilMahasiswa')
        .get(jsonku.showMahasiswa);
    app.route('/tampilMahasiswa/:id')
        .get(jsonku.showMahasiswaId);
    app.route('/tambah')
        .post(jsonku.addMahasiswa);
    app.route('/ubah')
        .post(jsonku.updateMahasiswa);
    app.route('/delete')
        .delete(jsonku.deleteMahasiswa);
    app.route('/tampilgroup')
        .get(jsonku.tampilGroupMatakuliah);
    
}