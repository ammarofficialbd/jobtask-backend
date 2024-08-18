import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: { // Added brand field
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    createdAt: { // Corrected the typo from "cratedAt" to "createdAt"
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
