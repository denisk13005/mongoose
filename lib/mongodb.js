import { MongoClient } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}
let cacheClient = null;
let cacheDb = null;
//fonction de connection a la base de données voulue dans notre cluster
export async function connectToDatabase() {
    try {
        if (mongoClient && database) { // si on est déjà connecté on retourne pour ne pas spammer la db
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect(); // nous connecte a la bdd
        }
        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE); //défini la bdd que l'on va utiliser

        //mise en cache des donnes pour éviter de sortir

        cacheClient = mongoClient
        cacheDb = database
        return { mongoClient : cacheClient, database : cacheDb };
    } catch (e) {
        console.error(e);
    }
}