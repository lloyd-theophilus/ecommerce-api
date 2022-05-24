const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => { 
    const authHeader = req.headers.token;
    if (authHeader) { 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' })
            }
            req.user = user;
            next();
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization };