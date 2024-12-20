
import mongoose from "mongoose";

const FaceSchema = new mongoose.Schema({
    // faceId: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    name: {
        type: String,
        default: ""
    },
    nodeIds: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Node" 
    }],
    height: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    color: {
        type: [Number],
        default: [255, 255, 255, 1]
    },
    books: [{ 
        type: mongoose.Types.ObjectId, 
        ref: "Book" 
    }],
});

export default mongoose.model("Face", FaceSchema);