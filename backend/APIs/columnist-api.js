const exp=require('express');
//const userApp = require('./user-api');
const columnistApp=exp.Router()

 //dummyyy
 const {createUserOrColumnist,loginUserOrColumnist}=require('./Util.js')

// const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
 const expressAsyncHandler=require('express-async-handler')
// const verifyToken=require('../Middlewares/verifyToken')

 let columnistCollection;
 let articlesCollection;
 columnistApp.use((req,res,next)=>{
    columnistCollection=req.app.get('columnistCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
 })

//define routes
columnistApp.post('/user',expressAsyncHandler(createUserOrColumnist) )
//author login
columnistApp.post('/login',expressAsyncHandler(loginUserOrColumnist) )


 //to save new article
 columnistApp.post('/new-article', /*verifyToken,*/ expressAsyncHandler(async(req,res)=>{
     //get new article from client
    const newArticle=req.body;
     //save new Article to articles collection
     await articlesCollection.insertOne(newArticle)
    //send res
    res.send({message:"New column added!"})
 }))

 //read artcles by columnist's username
 columnistApp.get('/articles/:username',/*verifyToken,*/expressAsyncHandler(async(req,res)=>{
     //get author's username from url
     const usernameOfColumnist =req.params.username;
    //get articles of current author
     const articlesList=await articlesCollection.find({username:usernameOfColumnist,status:true}).toArray()
    //send response
     res.send({message:"Articles",payload:articlesList})
 }))


 //edit article
 columnistApp.put('/article',/*verifyToken, */expressAsyncHandler(async(req,res)=>{

      //get modified article
      const modifiedColumn=req.body;
      console.log(modifiedColumn)
      let columnAfterModification= await articlesCollection.findOneAndUpdate({articleId:modifiedColumn.articleId},{$set:{...modifiedColumn}},{returnDocument:'after'})
       console.log(columnAfterModification)
       res.send({message:"Column modified!",payload:columnAfterModification})

 }))

 //delete article(soft delete)
 columnistApp.put('/article/:articleId',/*verifyToken,*/expressAsyncHandler(async(req,res)=>{
     let article=req.body;
     await articlesCollection.updateOne({articleId:article.articleId},{$set:{...article}})
    res.send({message:"Column deleted!"})
 }))

// Add pictures to column
columnistApp.post('/add-picture', /*verifyToken,*/ expressAsyncHandler(async(req, res) => {
    // Get articleId and pictures from the request body
    const { articleId, pictures } = req.body;
    
    try {
        // Find the article by articleId
        const article = await articlesCollection.findOne({ articleId });

        // Check if the article exists
        if (!article) {
            return res.status(404).send({ message: "Article not found" });
        }

        // Add the pictures to the article
        article.pictures = pictures;

        // Update the article with the new pictures
        await articlesCollection.updateOne({ articleId }, { $set: article });

        // Send a success response
        res.send({ message: "Pictures added to the column", payload: article });
    } catch (error) {
        // Handle errors
        console.error("Error adding pictures to column:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}));


module.exports=columnistApp;
