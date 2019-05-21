const mongooseLib = require("mongoose");
const SchemaLib = mongooseLib.Schema;

const UserSchema = new SchemaLib({
    userName : {
        type : String,
        required : true,
        unique : true,
        maxlength : [15, '`{PATH}` column must be lower or equal then `{MAXLENGTH}`. Current Value is `{VALUE}` '],
        minlength : [5, '`{PATH}` column must be bigger or equal then `{MINLENGTH}`. Current Value is `{VALUE}` ']
    },
    Password : {
        type : String,
        required : true,
        maxlength : [70, '`{PATH}` column must be lower or equal then `{MAXLENGTH}`. Current Value is `{VALUE}` '],
        minlength : [5, '`{PATH}` column must be bigger or equal then `{MINLENGTH}`. Current Value is `{VALUE}` ']
    },
    lastToken  : String,
    Status : {
        type :Boolean,
        default : true
    },
    date :{
        type :Date,
        default : Date.now
    }
});

module.exports = mongooseLib.model('user', UserSchema);