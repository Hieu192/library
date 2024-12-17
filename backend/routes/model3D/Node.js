import express from "express"
import Node from "../../models/model3D/Node.js"
const router = express.Router();

// router.post('/addNode', async (req, res) => {
//     const { nodeId, x, y, z } = req.body;
//     console.log("check add node");
//     console.log(req.body);

//     try {
//         const node = await Node.create({
//             nodeId,
//             x,
//             y,
//             z
//         });
//         console.log(node);
//         res.status(200).json(node);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });
router.post('/addNode', async (req, res) => {
    const { nodeId, x, y, z } = req.body;
    console.log("check add node");
    console.log(req.body);
    try {
        const node = await Node.create({
            x,
            y,
            z
        });
        console.log(node);
        res.status(200).json(node);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/getAllNodes', async (req, res) => {
    try {
        const nodes = await Node.find({});
        res.status(200).json(nodes);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;