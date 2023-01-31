const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect('/login');
    }
    next();
  };
   

  const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect('/');
    }
    next();
  };
   
const isAdmin = (req, res, next) => {
  if (req.session.currentUser.isAdmin === true) next()
  else {
    return res.redirect('/');
}  
}
  

  module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
  };