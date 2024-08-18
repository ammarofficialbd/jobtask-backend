
import Product from '../models/productModel.js'; // Adjust the path as needed

export const getProducts = async (req, res) => {
    const { page = 1, limit = 10, search = "", brand, category, minPrice, maxPrice, sortBy } = req.query;

    try {
        let query = {
            ...(search && { name: { $regex: search, $options: 'i' } }) // Case insensitive search in the name field
        };

        // Filter by brand and category if provided
        if (brand) query.brand = {$regex: new RegExp(brand, 'i')};
        if (category) query.category = {$regex: new RegExp(category, 'i')};

        // Filter by price range if provided
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sorting
        let sortOptions = {};
        switch (sortBy) {
            case 'priceLowToHigh':
                sortOptions.price = 1; // Ascending order
                break;
            case 'priceHighToLow':
                sortOptions.price = -1; // Descending order
                break;
            case 'newest':
                sortOptions.createdAt = -1; // Descending order
                break;
        }

        const products = await Product.find(query)
                                      .sort(sortOptions)
                                      .limit(limit * 1)
                                      .skip((page - 1) * limit)
                                      .exec();

        const count = await Product.countDocuments(query);

        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            sortedBy: sortBy || 'none'
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products: " + error.message });
    }
};



