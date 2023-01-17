// import findOrCreate from 'mongoose-findorcreate';
import { UserRole } from './UserRole';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

userSchema.plugin(passportLocalMongoose) /*{
  // Set usernameUnique to false to avoid a mongodb index on the username column!
  usernameUnique: false,

  findByUsername: function(model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    return model.findOne(queryParameters);
  }});*/
// userSchema.plugin(findOrCreate);

export default mongoose.models.User || mongoose.model('User', userSchema);
