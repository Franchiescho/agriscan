import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://gildoneto2004:<1630neto>@cluster0.obksqpk.mongodb.net/?retryWrites=true&w=majority";

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
