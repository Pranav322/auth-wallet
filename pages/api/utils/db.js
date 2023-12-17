const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URL;

export async function connectToMongo() {
      try {
            const connection = await mongoose.connect(mongoURI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB successfully");
            return connection; // Return the connection object
      } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error; // Throw the error for handling in the calling function
      }
}