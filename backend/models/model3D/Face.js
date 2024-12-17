import mongoose from "mongoose";

const FaceSchema = new mongoose.Schema({
    // faceId: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    nodeIds: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Node" 
    }],
    height: {
        type: Number,
        default: 0
    },
});

export default mongoose.model("Face", FaceSchema);