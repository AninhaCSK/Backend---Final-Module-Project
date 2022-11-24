import jsonWebToken from "jsonwebtoken";

const checkUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
 
  if(!token) return res.status(401).json({message: "invalide request / no access"})
  const payload = await jsonWebToken.verify(token, process.env.JWT_SECRET);
if(!payload) return res.status(401).json({message: "invalide request / no access"})
  req.email = payload.email
  next()
};
export default checkUser;
