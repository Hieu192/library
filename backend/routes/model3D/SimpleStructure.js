import express, { json } from 'express';
import SimpleStructure from '../../models/model3D/SimpleStructure.js';
import Floor from '../../models/model3D/Floor.js';
import Face from '../../models/model3D/Face.js';
import Node from '../../models/model3D/Node.js';
import FaceNode from '../../models/model3D/FaceNode.js';

const router = express.Router();

router.post('/addSimpleStructure', async (req, res) => {
    const {
        structureId,
        floorId,
        faceId,
        name,
        height,
        color
    } = req.body;
    try {
        const floor = await Floor.findOne({
            floorId
        });

        const face = await Face.findOne({
            faceId
        });

        if (!floor || !face) {
            return res.status(404).json({
                message: "Floor or Face not found"
            });
        }

        const simpleStructure = await SimpleStructure.create({
            structureId: structureId,
            floorId: floor._id,
            faceId: face._id,
            name: name,
            height: height,
            color: color
        });
        res.status(200).json(simpleStructure);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getAllSimpleStructures', async (req, res) => {
    try {
        const simpleStructures = await SimpleStructure.find({});
        res.status(200).json(simpleStructures);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getStructureByName/:name', async (req, res) => {
    try {
        // const simpleStructures = await SimpleStructure.find({});
        const simpleStructure = await SimpleStructure.findOne({
            name: req.params.name
        });

        console.log("simple structure\n", simpleStructure);
        const faceId = simpleStructure.faceId

        var nodes = [];

        const faceNodes = await FaceNode.find({ faceId: faceId });
        console.log('faceNodes\n');        
        for(var faceNode of faceNodes) {
            // console.log(faceNode);
            // console.log(faceNode.nodeId);
            const node = await Node.findOne({ _id: faceNode.nodeId });
            // console.log(node);
            nodes.push([node.x, node.y, node.z]);
        }   
        console.log(nodes);

        const data = {
            name: simpleStructure.name,
            nodes: nodes,
            height: simpleStructure.height,
            color: simpleStructure.color
        };

        console.log(data);

        res.status(200).json(convertData(data));
        } catch (err) {
        res.status(500).json(err);
        }
    });

    function convertData(data) {
        const result = {
        "type": "FeatureCollection",
        "generator": "smartcity",
        "copyright": "Smartcity",
        "timestamp": "2021-05-27T09:28:58Z",
        "features": [
            {
            "type": "Feature",
            "properties": {
                "Building name": data.name,
                "height": data.height,
                "idb": "1"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [data.nodes]
            },
            "id": "pp1"
            }
        ]
        };

        return result;
    }
export default router;