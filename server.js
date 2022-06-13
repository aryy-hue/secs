const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
var morgan          = require('morgan');
var cors            = require('cors');

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// memanggil routes
var routes = require('./routes');
routes(app);

// daftarkan menu routes dari indes.js
app.use('/auth',require('./middleware'));

app.listen(3001, () => {
    console.log(`Server started on port 3001`);
});