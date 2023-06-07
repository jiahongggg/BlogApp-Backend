import express from 'express';
import { getAllUsers, signup, login } from '../controllers/user-controller';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

export default router;
