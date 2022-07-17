import mongoose, { Schema,model,models } from "mongoose";

const testSchema = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    required : true,
    unique:true //vérification de mail unique !
  }
})

const Test = models.Test || model('Test', testSchema) //si models.Test n'existe pas il en créera un dans la bdd sinon il ajoutera les données au model Test

export default Test