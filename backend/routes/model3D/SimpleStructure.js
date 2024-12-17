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

router.post("/add-structure", async (req, res) => {
    try {
      const file = req.body; // Dữ liệu GeoJSON
      const features =  file.features; // Dữ liệu GeoJSON
      const nameFile = file.name; // Tên của file GeoJSON
      const heightFile = file.height; // Chiều cao file GeoJSON (tức là cái renderer.symbol.symbolLayers.size)
      const colorFile = file.color; // Màu của file GeoJSON (tức là cái renderer.symbol.symbolLayers.material.color)

      if (!features || !Array.isArray(features)) {
        return res.status(400).json({ message: "Invalid data format" });
      }
  
      const faceIds = []; // Danh sách lưu ID của Face
  
      for (const feature of features) {
        const coordinates = feature.geometry.coordinates[0]; // Lấy mảng tọa độ
        const nodeIds = [];
  
        // 1. Lưu Node (x, y, z)
        for (const coord of coordinates) {
          const [x, y, z] = coord;
          const node = new Node({ x, y, z });
          const savedNode = await node.save();
          nodeIds.push(savedNode._id);
        }
  
        // 2. Tạo Face từ 5 Node ID
        const height = feature.properties.height;
        const face = new Face({ nodeIds: nodeIds, height: height });
        const savedFace = await face.save();
        faceIds.push(savedFace._id);
      }
  
    //   3. Tạo Structure từ danh sách Face ID

      const structure = new SimpleStructure({ faceIds: faceIds, name: nameFile, height: heightFile, color: colorFile });
      const savedStructure = await structure.save();

      res.status(201).json({
        message: "Structure saved successfully",
        structure: savedStructure,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

router.get('/getStructureByNameVip/:name', async (req, res) => {
    try {
        // const simpleStructures = await SimpleStructure.find({});
        const simpleStructure = await SimpleStructure.findOne({
            name: req.params.name
        });
        console.log("simple structure:::", simpleStructure);
        const faceIds = simpleStructure.faceIds;
        var nodes = [];
        const faces = [];
        for(const faceId of faceIds) {
            const face = await Face.findOne({ _id: faceId });
            const nodeIds = face.nodeIds;
            console.log("face::: ",face);
            console.log("nodeIds::: ",nodeIds);
            for (const nodeId of nodeIds) {
                const node = await Node.findOne({ _id: nodeId });
                console.log("node::: ",node);
                nodes.push([node.x, node.y, node.z]);
                console.log("nodes::: ",nodes);
            }
            faces.push({
                "type": "Feature",
                "properties": {
                    "height": face.height,
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [nodes]
                },
            });
            nodes = [];
            console.log("faces::: ",faces);
        }

        const file = {
            "type": "FeatureCollection",
            "generator": "smartcity",
            "features": faces
        };


        res.status(200).json(file);
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