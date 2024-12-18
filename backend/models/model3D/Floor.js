import mongoose from "mongoose";

const FloorSchema = new mongoose.Schema({
    floorId: {
        type: String,
        require: true,
        unique: true
    },
    constructionId: { 
        type: mongoose.Types.ObjectId, 
        ref: "Construction" 
    },
    name: {
        type: String,
        default: ""
    },
});

export default mongoose.model("Floor", FloorSchema);