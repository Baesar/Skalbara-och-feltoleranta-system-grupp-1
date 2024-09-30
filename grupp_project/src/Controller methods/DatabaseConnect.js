
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://huah21vn:<hr7896DWnuQhKEL>@web-grupp-2-db.bhfmb.mongodb.net/?retryWrites=true&w=majority&appName=Web-grupp-2-db";
// "mongodb+srv://huah21vn:<hr7896DWnuQhKEL>@web-grupp-2-db.bhfmb.mongodb.net/?retryWrites=true&w=majority&appName=Web-grupp-2-db";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
//Grupp-2-database.People

export const confirm_connect = async (context) => 
    {
        client.db().collection('People').find({}).toArray();

        console.log('!!!' , data);
    }
export const send_init = async( context) => {
    
}