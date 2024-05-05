
 const bcryptjs=require('bcryptjs')
  const jwt=require('jsonwebtoken')
//require('dotenv').config()



// //req handler for user/auhtor registration
 const createUserOrColumnist = async (req, res) => {
  //get users and authors collecion object
   const usersCollectionObj = req.app.get("usersCollection");
  const columnistCollection = req.app.get("columnistCollection");

  //get user or columnist 
   const user = req.body;

   //check for duplicate user
  if (user.userType === "user") {
   let dbuser = await usersCollectionObj.findOne({ username: user.username });
   if (dbuser !== null) {
    return res.send({ message: "User already exists" });
    }
  }
  //check for duplicate columnist
  if (user.userType === "writer") {
     let dbuser = await columnistCollection.findOne({ username: user.username });
    if (dbuser !== null) {
     return res.send({ message: "Columnist already exists" });
    }
  }

   //hash password
    const hashedPassword=await bcryptjs.hash(user.password,6)
    user.password=hashedPassword;

    //save user
    if(user.userType==='user'){
        await usersCollectionObj.insertOne(user)
        res.send({message:"User created successfully!"})
    }
    //save author
      if(user.userType==='writer'){
        await columnistCollection.insertOne(user) 
        res.send({message:"Columnist profile created successfully!"})
    }

  };


  const loginUserOrColumnist = async(req, res) => {
    //get users and authors collection object
    const usersCollectionObj = req.app.get("usersCollection");
    const columnistCollection = req.app.get("columnistCollection");

    //get user or author
    let userCred = req.body;

    //verify username of user
    if (userCred.userType === 'user') {
        let dbuser = await usersCollectionObj.findOne({ username: userCred.username })
        if (dbuser === null) {
            return res.send({ message: "Invalid username!" })
        } else {
            let status = await bcryptjs.compare(userCred.password, dbuser.password)
            if (status === false) {
                return res.send({ message: "Invalid password!" })
            } else {
                const signedToken = jwt.sign({ username: dbuser.username }, 'abcdef', { expiresIn: 50 })  //dummyyy
                delete dbuser.password;
                res.send({ message: "Successful login!", token: signedToken, user: dbuser })
            }
        }
    }

    //verify username of columnist
    if (userCred.userType === 'writer') {
        let dbColumnist = await columnistCollection.findOne({ username: userCred.username })
        if (dbColumnist === null) {
            return res.send({ message: "Invalid username!" })
        } else {
            let status = await bcryptjs.compare(userCred.password, dbColumnist.password)
            if (status === false) {
                return res.send({ message: "Invalid password!" })
            } else {
                const signedToken = jwt.sign({ username: dbColumnist.username }, 'abcdef', { expiresIn: 50 })  //dummyyy
                delete dbColumnist.password;
                res.send({ message: "Successful login!", token: signedToken, user: dbColumnist })
            }
        }
    }
};

module.exports = { createUserOrColumnist, loginUserOrColumnist };
