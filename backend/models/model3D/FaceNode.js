import mongoose from "mongoose";

const FaceNode = new mongoose.Schema({
    faceId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Face" 
    },
    nodeId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Node" 
    },
});

export default mongoose.model("FaceNode", FaceNode);