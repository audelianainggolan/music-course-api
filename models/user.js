const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { hash } = require('../helpers/password')

const UserSchema = new Schema({
  id: ObjectId,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true       
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return 
  this.password = await hash(this.password)
})

const User = mongoose.model('User', UserSchema);

module.exports = User;