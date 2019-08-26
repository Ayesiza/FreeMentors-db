import { sessions}from '../data/sessionData';
const appSecretkey = 'tesyuseyeyseyuwu'
 

export const getSessionById = (req,res,next) => {
    const session = sessions.find(session => session.sessionId === parseInt(req.params.id))
    if(!session) return res.status(404).send({status:404, message:'session of the given Id not found'})
    req.session = session
  next();
  }
 
