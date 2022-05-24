import jwt from 'jsonwebtoken';

export default async function isAuthed(req) {
    if (req.cookies.token) {
        const token = req.cookies.token;
        const bool = jwt.verify(token, process.env.SECRET_JWT_TOKEN, (err, result) => {
            if (err) return false
            req.token = result
            return true
        })
        return bool
    } else {
        return false
    }
}