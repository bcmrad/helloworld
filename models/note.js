var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var noteSchema = new Schema({
  title : { type: String, required: true, trim: true },
  body : { type: String, required: true, trim: true },
  date_created : { type: Date, default: Date.now },
  votes : {type: Number, default: 0 },
  creatorID : {type: Schema.Types.ObjectId, required: true},
  latitude : {type: Number, required: true},
  longitude : {type: Number, required: true},
  location : {type: Schema.Types.ObjectId},
  visibility : {type: Number, default: 0}
});

var note = mongoose.model('note', noteSchema);

module.exports = {
  Note: note
};



