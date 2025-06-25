import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;

let client = new MongoClient(uri);
let clientPromise = client.connect();

clientPromise.catch((error) => {
  console.error("Falha na conexão com o MongoDB:", error);
});

export default clientPromise;
