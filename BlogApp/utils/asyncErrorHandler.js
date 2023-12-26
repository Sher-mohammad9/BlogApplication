module.exports = (fun)=>{
    return (req, resp, next)=>{
        fun(req, resp, next).catch((error)=>{
            error.user = req.user
             next(error)
            })
    }
}