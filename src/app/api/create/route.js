import { MongoClient } from 'mongodb';

export async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://brkkie13:brkkie13@cluster0.scxtcam.mongodb.net/makeform?retryWrites=true&w=majority'
    );
    const db = client.db();
    const result = await db.collection('new-form').insertOne(data);
    client.close();
    res.status(201).json({ message: 'Form inserted!' });
  }
}
