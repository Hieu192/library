import express from "express"
import Face from "../models/Face.js"
import Node from "../models/Node.js"
import FaceNode from "../models/FaceNode.js"
const router = express.Router();

router.post('/addFaceNode', async (req, res) => {
    const { faceId, nodeId } = req.body;

    try {
        const face = await Face.findOne({
            faceId
        });

        const node = await Node.findOne({
            nodeId
        });

        if (!face || !node) {
            return res.status(404).json({
                message: "Face or Node not found"
            });
        }

        const faceNode = await FaceNode.create({
            faceId: face._id,
            nodeId: node._id
        });
        res.status(200).json(faceNode);
    } catch (err) {
        return res.status(500).json(err);
    }
});

export default router;