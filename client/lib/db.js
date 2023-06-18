import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('chatApplication'); 
}