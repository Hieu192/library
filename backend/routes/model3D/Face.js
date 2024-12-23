import express from "express"
import Face from "../../models/model3D/Face.js"
const router = express.Router();

router.post('/addFace', async (req, res) => {
    const { faceId } = req.body;
    try {
        const face = await Face.create({
            faceId,
        });
        res.status(200).json(face);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getAllFaces', async (req, res) => {
    try {
        const faces = await Face.find({});
        res.status(200).json(faces);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;