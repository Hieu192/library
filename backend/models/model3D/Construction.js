import mongoose from "mongoose";

const ConstructionSchema = new mongoose.Schema({
    constructionId: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        default: ""
    },
});

export default mongoose.model("Construction", ConstructionSchema);