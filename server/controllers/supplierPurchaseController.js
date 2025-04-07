const SupplierPurchase = require('../models/SupplierPurchase');
const Product = require('../models/product');

const createPurchase = async (req, res) => {
    try {
        const { supplierId, productName, quantity, unitPrice } = req.body;

        // Validate required fields
        if (!supplierId || !productName || !quantity || !unitPrice) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find the product by name
        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ error: `Product "${productName}" not found` });
        }

        // Save the purchase
        const totalAmount = quantity * unitPrice;
        const newPurchase = new SupplierPurchase({
            supplier: supplierId,
            product: productName, // Store name instead of ID
            quantity,
            unitPrice,
            totalAmount,
        });
        await newPurchase.save();

        // Update product quantity
        product.quantity += parseInt(quantity);
        await product.save();

        res.status(201).json({
            message: 'Purchase created and product inventory updated',
            purchase: newPurchase,
            updatedProduct: product,
        });
    } catch (err) {
        console.error('Error creating purchase:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};
const getAllPurchases = async (req, res) => {
    try {
        const purchases = await SupplierPurchase.find().populate('supplier');
        res.json({ purchases });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ error: 'Failed to fetch purchases' });
    }
};

module.exports = {
    createPurchase,
    getAllPurchases
};
