const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {
    try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "tajni_kljuc_vau_vau_ne_mozes_me_provaliti");
    if(decodedToken.tipKorisnika == "Admin"){
    next()}
    else {
        res.status(403).json({message: "REKA SAM NE MOŽE!"});
    }
    } catch (error) {
        res.status(401).json({message: "Ne može!"});
    }
    
};