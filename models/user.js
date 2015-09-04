var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName : { type: String, required: true, trim: true },
  lastName : { type: String, required: true, trim: true },
  ownNotes : { type: [Schema.Types.ObjectId], default: [] },       //changes after
  favouriteNotes : { type: [Schema.Types.ObjectId], default: [] }, //changes after
  date_created : { type: Date, required: true, default: Date.now },                //use default
  userName : { type: String, required: true, trim: true, index: { unique: true } },
  passWord : { type: String, required: true, trim: true },
  friends : { type: [Schema.Types.ObjectId], default: [] },        //changes after
  email : { type: String, required: true, trim: true },
  acctStatus : { type: String, required: true, trim: true, default: "active" },    //changes after
  secStatus: { type: String, required: true, trim: true, default: "user" }         //possibly elevated
  // settings : { type: String, required: true, trim: true },
});
var user = mongoose.model('user', userSchema);

module.exports = {
  User: user
};


