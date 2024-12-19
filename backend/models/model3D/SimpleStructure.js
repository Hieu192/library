import mongoose from "mongoose";

const SimpleStructureSchema = new mongoose.Schema({
    floorId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Floor" 
    },
    faceIds: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Face" 
    }],
    name: {
        type: String,
        default: ""
    },
    height: {
        type: Number,
        default: 1
    },
    color: {
        type: [Number],
        default: [255, 255, 255, 1]
    }
});

export default mongoose.model("SimpleStructure", SimpleStructureSchema);