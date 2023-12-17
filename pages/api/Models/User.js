const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
      mainSitePassword: {
            type: String, // Or the appropriate type for storing hashed passwords
            default: null, // Set a default value or handle this accordingly
            required: true
      }
});

const User = mongoose.models['user'] || mongoose.model('user', userSchema);
module.exports = User;
