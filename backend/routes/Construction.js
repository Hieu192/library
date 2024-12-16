import express from "express"
import Construction from "../models/Construction.js"
const router = express.Router();

router.post('/addConstruction', async (req, res) => {
    const { constructionId, name } = req.body;
    try {
        const construction = await Construction.create({
            constructionId,
            name
        });
        res.status(200).json(construction);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;