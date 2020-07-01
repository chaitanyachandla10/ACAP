 const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/acap', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const taskschema = mongoose.Schema({
    departmentname:{type:String, require:true},
    Managername:{type:String, require:true},
    manager:[{developer:String, tester:String, noofManager:String}],

})
/*
    manager:{
    developer:{type:Number, require:true},
    tester:{type:Number, require:true},
}
*/
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = mongoose.model('task', taskschema);