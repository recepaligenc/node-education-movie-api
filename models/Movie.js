const mongooseLib = require("mongoose");
const SchemaLib = mongooseLib.Schema;

const MovieSchema = new SchemaLib({
    title : {
        type : String,
        required : true
    },
    category : String,
    country : String,
    year : Number,
    imdb_score :  Number,
    director_id : SchemaLib.Types.ObjectId,
    date :{
        type :Date,
        default : Date.now
    }
});

module.exports = mongooseLib.model('movie', MovieSchema);