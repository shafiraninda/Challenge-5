const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt
  
    if (token) {
      jwt.verify(token, 'secret', (err, decodedToken) => {
        if (err) {
          res.locals.user = null
          res.redirect('/login')
        } else {
          res.locals.user = decodedToken.username
          console.log(decodedToken)
          next()
        }
      })
    } else {
      res.locals.user = null
      res.redirect('/login')
    }
  
  }
  
  module.exports = isLoggedIn


// const isLoggedIn = (req, res, next) => {
//     const token = req.cookies.jwt
//     if(token){
//         jwt.verify(token, 'secret', (err, decodedToken) => {
//             if(err){
//                 res.locals.greeting=null;
//                 res.render('main', {
//                     pageTitle: "Main Page",
//                     cssStyle:null,
//                     visibility:"visible",
//                 })
//             }
//             else{
//                 res.locals.greeting=decodedToken.username;
//                 res.render('main', {
//                     pageTitle: "Main Page",
//                     cssStyle:null,
//                     visibility:"invisible",
//                 })
//                 next()
//             }
//         })
//     } else {
//         res.locals.greeting=null,
//         res.render('main', {
//             pageTitle: "Main Page",
//             cssStyle:null,
//             visibility:"visible",
//         })
//     }
// }

// module.exports = isLoggedIn