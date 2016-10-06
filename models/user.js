var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName : { type: String, required: true, trim: true },
  lastName : { type: String, required: true, trim: true },
  ownNotes : { type: [Schema.Types.ObjectId], default: [] },       //changes after
  favouriteNotes : { type: [Schema.Types.ObjectId], default: [] }, //changes after
  date_created : { type: Date, default: Date.now },                //use default
  displayName : { type: String, required: true, trim: true, default: ""},
  password : { type: String, required: true, trim: true },
  friends : { type: [Schema.Types.ObjectId], default: [] },        //changes after
  email : { type: String, required: true, trim: true, index: { unique: true } },
  acctStatus : { type: String, trim: true, default: "active" },    //changes after
  secStatus: { type: String, trim: true, default: "user" },         //possibly elevated
  settings : { type: String, trim: true, default: "default" }
});
var user = mongoose.model('user', userSchema);

module.exports = {
  User: user
};


