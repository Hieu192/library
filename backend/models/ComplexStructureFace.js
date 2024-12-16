import mongoose from "mongoose";

const ComplexStructureFaceSchema = new mongoose.Schema({
    structureId: { 
        type: mongoose.Types.ObjectId, 
        ref: "ComplexStructure" 
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

export default mongoose.model("ComplexStructureFace", ComplexStructureFaceSchema);