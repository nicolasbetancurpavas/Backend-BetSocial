import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if (!token) return res.status(403).send("Access Danied")
        if (token.startswith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifyToken
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}