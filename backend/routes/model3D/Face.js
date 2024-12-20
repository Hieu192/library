import express from "express"
import Face from "../../models/model3D/Face.js"
const router = express.Router();
import mongoose from 'mongoose';

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

// router.put('/updateFace:', async (req, res) => {
//     const { faceId, name, nodeIds, height, description, color, books } = req.body;
//     try {
//         const face = await Face.findOneAndUpdate(
//             { faceId },
//             { name, nodeIds, height, description, color, books },
//             { new: true }
//         );
//         res.status(200).json(face);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.patch('/updateFace/:faceId', async (req, res) => {
    const { _id } = req.params;
    const { name, nodeIds, height, description, color, books } = req.body;
    try {
        const face = await Face.findOne(
            { _id: mongoose.Types.ObjectId(_id)},
        );
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