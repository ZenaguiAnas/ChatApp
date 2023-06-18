import { connectToDatabase } from '../../lib/db';

const db = connectToDatabase();

export default async function handler(req, res) {
    const { username } = req.body;


    try {
      await db.collection('users').insertOne({username})
      res.status(200).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user.' });
    }
}