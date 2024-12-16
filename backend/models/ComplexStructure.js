import mongoose from "mongoose";

const ComplexStructureSchema = new mongoose.Schema({
    structureId: {
        type: String,
        require: true,
        unique: true
    },
    floorId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Floor" 
    },
});

export default mongoose.model("ComplexStructure", ComplexStructureSchema);