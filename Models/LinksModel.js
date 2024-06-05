import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    clicks: [
        {
            insertedAt:
            {
                type: Date,
                default: Date.now,
                require: true
            },
            ipAddress: String,
            targetParamValue: String
        }
    ],
    targetParamName: {
        type:String,
        default:"target"
    },
    targetValues: [
        {
            name: String,
            value: Number
        }
    ]

});

export default mongoose.model("links", LinkSchema);
