import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
    // nodeId: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    x: {
        type: Number,
        require: true,
        default: 0
    }, 
    y: {
        type: Number,
        require: true,
        default: 0
    },
    z: {
        type: Number,
        require: true,
        default: 0
    },
});

export default mongoose.model("Node", NodeSchema);