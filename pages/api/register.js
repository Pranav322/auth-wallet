import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToMongo } from './utils/db';
import User from './Models/User';

const JWT_SECRET = "WebTokenSignedBy@teamLightning";

export default async function handler(req, res) {
      if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
      }

      const { email, password, meterId } = req.body;

      try {
            const connection = await connectToMongo(); // Connect to MongoDB
            const db = connection.connection.db; // Access the database from the connection object
            const user = await User.findOne({ email });
            // console.log(user);

            if (!user) {
                  return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (user.mainSitePassword !== null) {
                  return res.status(409).json({ message: "Your Account is already registered" });
            }

            if (String(user._id) !== meterId) {
                  return res.status(401).json({ message: 'Invalid meter ID' });
            }

            try {

                  const salt = await bcrypt.genSalt(10);
                  const securePassword = await bcrypt.hash(password, salt);

                  user.mainSitePassword = securePassword;

                  await user.save();
                  const payload = {
                        user: {
                              id: user.id
                        }
                  };
                  const authToken = jwt.sign(payload, JWT_SECRET);
                  res.status(200).json({ authToken });
            }

            catch (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Server error' });

            }

      }
      catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
      }
}