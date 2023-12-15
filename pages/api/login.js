import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToMongo } from './utils/db';
import User from './Models/User';

const JWT_SECRET = "WebTokenSignedBy@teamLightning";

export default async function handler(req, res) {
      if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
      }

      const { email, password } = req.body;

      try {
            const connection = await connectToMongo(); // Connect to MongoDB
            const db = connection.connection.db; // Access the database from the connection object
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({ message: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.mainSitePassword);
            if (!passwordCompare) {
                  return res.status(400).json({ message: "Please try to login with correct credentials" });
            }

            const payload = {
                  user: {
                        id: user.id
                  }
            }
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.status(200).json({ authToken });
      }
      catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server Error");
      }

}