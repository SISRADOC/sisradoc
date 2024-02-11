const isAdmin = (req, res, next) => {
  const { user } = req.session;
  
  if (!user) {
    return res.redirect("/admin/login")
  }

  if(!user.is_admin){
    return res.redirect("/index")
  }

  return next()
}
  
module.exports = isAdmin;