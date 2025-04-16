export default  function (req, res, next){
    if (!req.headers.authorization) {
        return res.status(401).json({mesage: "du har ikke adgang"})
    }

    if (req.headers.authorization != "Bearer 12345678")
    {
        return res.status(403).json({mesage: "Invalid token"})
    }

    next()
}