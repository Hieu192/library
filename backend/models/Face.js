import mongoose from "mongoose";

const FaceSchema = new mongoose.Schema({
    faceId: {
        type: String,
        require: true,
        unique: true
    },
});

export default mongoose.model("Face", FaceSchema);