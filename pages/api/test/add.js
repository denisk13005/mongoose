import connectMongo from "../../../utils/connectMongo"
import Test from "../../../models/testModel" 

//crée un user
/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */
export default async function addTest(req,res)  {
  try {
    
    const {name, email} = req.body //qu'on a défini dans models/testModel
    console.log('connecting to mongo')
    await connectMongo()
    console.log('connected to mongo')
    const test = await Test.create(req.body)
    console.log('document created')
    res.json({test})
  } catch (error) {
    res.json(error)
  }
}

