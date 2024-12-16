import express from "express"
import Floor from "../models/Floor.js"
import Construction from "../models/Construction.js"

const router = express.Router();

router.post('/addFloor', async (req, res) => {
    const { floorId, constructionId, name } = req.body;
    
    try {
        const construction = await Construction.findOne({ constructionId });
        if (!construction) {
            return res.status(404).json({
                message: "Construction not found"
            });
        }
        const floor = await Floor.create({
            floorId: floorId,
            constructionId: construction._id,
            name: name
        });
        res.status(200).json(floor);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;