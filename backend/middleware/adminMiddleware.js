import dotenv from "dotenv"
dotenv.config();

export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ message: 'Invalid API key' });
    }
    
    next();
  };