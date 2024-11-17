/* const connection = require('../models/Users')
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) =>{
    const {username, password} = req.body;
    const consult = 'SELECT * FROM users WHERE username = ? AND password = ?';

    try {
      connection.query(consult, [userName, password], (err, result)=>{
          if(err){
              res.send(err);
          }

          if(result.length > 0){
              const token = jwt.sign({username}, "Stack", {
                  expiresIn: '3m'
              });
              res.send({token});
          } else {
              console.log('wrong user')
              res.send({message: 'wrong user'})
          }
      })
    } catch (e) {

    }

} */
