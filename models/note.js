var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var noteSchema = new Schema({
  title : { type: String, required: true, trim: true },
  body : { type: String, required: true, trim: true },
  date_created : { type: Date, default: Date.now },
  votes : {type: Number, default: 0 },
  creatorID : {type: Schema.Types.ObjectId, required: true},
  lat : {type: Number, required: true},
  lon : {type: Number, required: true},
  location : {type: Schema.Types.ObjectId}
});

var note = mongoose.model('note', noteSchema);

module.exports = {
  Note: note
};



