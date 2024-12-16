import mongoose from "mongoose";

const SimpleStructureSchema = new mongoose.Schema({
    structureId: {
        type: String,
        require: true,
        unique: true
    },
    floorId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Floor" 
    },
    faceId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Face" 
    },
    name: {
        type: String,
        default: ""
    },
    height: {
        type: Number,
        default: 1
    },
    color: {
        type: String,
        default: "#ffffff"
    }
});

export default mongoose.model("SimpleStructure", SimpleStructureSchema);