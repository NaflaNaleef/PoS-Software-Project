const SalesReturn = require('../models/SalesReturn');
const Product = require('../models/product');

const createSalesReturn = async (req, res) => {
    try {
        const { customerId, productName, quantity, reason } = req.body;

        if (!customerId || !productName || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ error: `Product "${productName}" not found` });
        }

        const salesReturn = new SalesReturn({
            customer: customerId,
            product: productName,
            quantity,
            reason,
        });
        await salesReturn.save();

        product.quantity += parseInt(quantity); // Add returned quantity back to stock
        await product.save();

        res.status(201).json({
            message: 'Sales return recorded and product inventory updated',
            return: salesReturn,
            updatedProduct: product,
        });
    } catch (err) {
        console.error('Error creating sales return:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};

module.exports = {
    createSalesReturn
};
