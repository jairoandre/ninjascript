import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  birthdate: Date,
  gender: String,
  avatar: String,
  username: String,  
  password: String,
})

export function getUserModel() {
  return mongoose.model('User', userSchema);
}
