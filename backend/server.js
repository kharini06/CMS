//create express app
const exp = require("express"); 
const app = exp();                
const path = require("path");
require("dotenv").config();       
//add body parser middleware
app.use(exp.json());
//app.use(exp.static(path.join('D:/CMS/frontend/build')));
app.use(exp.static(path.join(__dirname, '../frontend/build')));


const mongoClient = require("mongodb").MongoClient;


mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {

    const cmsDBobj = client.db("harinidb");

    const usersCollection = cmsDBobj.collection("users");
    const columnistCollection = cmsDBobj.collection("columnist");
    const articlesCollection = cmsDBobj.collection("articles");


    app.set("usersCollection", usersCollection);
    app.set("columnistCollection", columnistCollection);
    app.set("articlesCollection", articlesCollection);
    console.log("Successful DB connection");
  })
  .catch((err) => {
    console.log("Error in DB connection", err);
  });


 const userApp = require("./APIs/user-api");
 const columnistApp = require("./APIs/columnist-api");
 const adminApp = require("./APIs/admin-api"); 


 app.use("/user-api", userApp)
 app.use("/columnist-api", columnistApp)
app.use("/admin-api", adminApp)


app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})


app.use((err, req, res, next) => {
  res.send({ status: "error", message: err.message });
});


const port = process.env.PORT || 3000;   


app.listen(port, () => console.log(`the http server on the port ${port} ...`));  