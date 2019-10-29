import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

export default UserSchema;