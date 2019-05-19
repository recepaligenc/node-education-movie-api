const mongooseLib = require("mongoose");
const SchemaLib = mongooseLib.Schema;

const MovieSchema = new SchemaLib({
    title : {
        type : String,
        required : true,
        maxlength : [15, '`{PATH}` column must be lower or equal then `{MAXLENGTH}`. Current Value is `{VALUE}` '],
        minlength : [5, '`{PATH}` column must be bigger or equal then `{MINLENGTH}`. Current Value is `{VALUE}` ']
    },
    category : String,
    country : String,
    year : Number,
    imdb_score :  Number,
    director_id : {
        type: SchemaLib.Types.ObjectId,
        required : true,
    },
    date :{
        type :Date,
        default : Date.now
    }
});

module.exports = mongooseLib.model('movie', MovieSchema);