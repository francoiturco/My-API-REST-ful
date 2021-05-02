
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, { useNewUrlParser: true,useUnifiedTopology: true }).then(res => app.listen(config.port, () => {console.log('Servidor y base de datos funcionando');}));
