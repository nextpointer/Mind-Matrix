import mongoose, { Schema } from "mongoose";

const counselorSchema = new Schema({
    CounsellorName: {
        type: String,
        required: true,
    },
    SpecializedBio: {
        type: String,
        required: true,
    },
    ShortBio: {
        type: String,
        required: true,
    },
    Qualification: {
        type: String,
        required: true,
    },
    FullBio: {
        type: String,
        required: true,
    },
    ImgLink: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Glance: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Specialized: [{
        type: String,
        required: true,
    }],
    Rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
}, {
    timestamps: true,
});

export const Counselor = mongoose.model('Counselor', counselorSchema);
