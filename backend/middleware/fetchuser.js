
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hitesh"; // Use an environment variable or a default secret
const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to the req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;



// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'Hiteshisagood$oy'


// const fetchuser  = (req, res , next ) =>{
//     // Get the user from  the jwt token and add id to req object 
//     const token = req.header('auth-token');
//     if(!token){
//         res.status(401).send({error : "Please authenticate using a valid token"}) 
//     }
//      try {
//         const data = jwt.verify(token,JWT_SECRET);
//         req.user = data.user;
//         next()
//     }
     
//      catch (error) {
//         res.status(401).send({error : "Please authenticate using a valid token"}) 
        
//      }
//     }
   

// module.exports = fetchuser;