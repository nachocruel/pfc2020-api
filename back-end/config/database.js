const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);
//const urlLocal = "mongodb://localhost:27017/pfc-2020"
const password = "301cronos"
const urlCloud = `mongodb+srv://edvan:${password}@cluster0-ujfno.gcp.mongodb.net/pfc-2020?retryWrites=true&w=majority`

//mongoose.connect(urlLocal, {useNewUrlParser: true, useUnifiedTopology: true});
//exports.connectionLocal = mongoose.connection
//exports.mongo = mongoose
mongoose.connect(urlCloud, {useNewUrlParser: true, useUnifiedTopology: true})
exports.connectionCloud = mongoose.connection;