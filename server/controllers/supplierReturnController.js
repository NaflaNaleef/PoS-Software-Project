const SupplierReturn = require('../models/SupplierReturn');
const Product = require('../models/product');

const createReturn = async (req, res) => {
    try {
        const { supplierId, productName, quantity, reason } = req.body;

        if (!supplierId || !productName || !quantity) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.findOne({ name: productName });

        if (!product) {
            return res.status(404).json({ error: `Product "${productName}" not found` });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ error: 'Return quantity exceeds available stock' });
        }

        const supplierReturn = new SupplierReturn({
            supplier: supplierId,
            product: productName,
            quantity,
            reason,
        });
        await supplierReturn.save();

        product.quantity -= parseInt(quantity);
        await product.save();

        res.status(201).json({
            message: 'Return created and product inventory updated',
            return: supplierReturn,
            updatedProduct: product,
        });
    } catch (err) {
        console.error('Error creating return:', err);
        res.status(500).json({ error: 'Internal server error', message: err.message });
    }
};

module.exports = {
    createReturn
};
