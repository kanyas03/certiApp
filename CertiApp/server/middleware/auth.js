import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretkey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
        console.log("Cookie not found");
        return res.status(401).json({ msg: "Unauthorized: No token found" });
    }

    try {
        const cookieArray = cookies.split(';');

        for (let cooki of cookieArray) {
            const [name, token] = cooki.trim().split('=');
            if (name === 'certiapp') {
                const verified = jwt.verify(token, secretkey);
                console.log("Verified User:", verified);
                req.userId = verified.userId;
                req.username = verified.userName;
                req.userrole = verified.userRole;
                return next();
            }
        }

        return res.status(401).json({ msg: "Unauthorized: Invalid token" });

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ msg: "Invalid token" });
    }
};

export default authenticate;