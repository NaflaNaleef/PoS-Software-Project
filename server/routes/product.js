<<<<<<< HEAD
// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product');
// const categoryBaseCodes = {
//   Electronics: "ELEC",
//   Clothing: "CLTH",
//   Food: "FOOD",
//   Furniture: "FURN",
// };

// router.post('/add', async (req, res) => {
//   try {
//     const { name, category, quantity, prize } = req.body;

//     // Validate the category
//     const baseCode = categoryBaseCodes[category];
//     if (!baseCode) {
//       return res.status(400).json({ error: 'Invalid category' });
//     }

//     // Count existing products in the same category
//     const count = await Product.countDocuments({ category });

//     // Generate a unique code for the category
//     const categoryCode = `${baseCode}-${(count + 1).toString().padStart(3, "0")}`;

//     // Create the new product with the generated categoryCode
//     const products = new Product({ name, category, quantity, categoryCode, prize });
//     await products.save();

//     res.status(201).json({ message: 'Product added successfully', product });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });



// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
 
// // Delete a product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
=======
// // const express = require('express');
// // const router = express.Router();
// // const Product = require('../models/product');
// // const categoryBaseCodes = {
// //   Electronics: "ELEC",
// //   Clothing: "CLTH",
// //   Food: "FOOD",
// //   Furniture: "FURN",
// // };

// // router.post('/add', async (req, res) => {
// //   try {
// //     const { name, category, quantity, prize } = req.body;

// //     // Validate the category
// //     const baseCode = categoryBaseCodes[category];
// //     if (!baseCode) {
// //       return res.status(400).json({ error: 'Invalid category' });
// //     }

// //     // Count existing products in the same category
// //     const count = await Product.countDocuments({ category });

// //     // Generate a unique code for the category
// //     const categoryCode = `${baseCode}-${(count + 1).toString().padStart(3, "0")}`;

// //     // Create the new product with the generated categoryCode
// //     const products = new Product({ name, category, quantity, categoryCode, prize });
// //     await products.save();

// //     res.status(201).json({ message: 'Product added successfully', product });
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // });



// // // Get all products
// // router.get('/', async (req, res) => {
// //   try {
// //     const products = await Product.find();
// //     res.status(200).json(products);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });
 
// // // Delete a product
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Product.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Product deleted successfully' });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Update a product
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.status(200).json({ message: 'Product updated successfully', product });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product'); // Import the Product model

// // Create a product
// router.post('/', async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct); // Return the saved product
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Read products with pagination, sorting, and filtering
// router.get('/', async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

//     const query = filter
//       ? {
//           $or: [
//             { name: { $regex: filter, $options: 'i' } }, // Case-insensitive search in name
//             { description: { $regex: filter, $options: 'i' } }, // Case-insensitive search in description
//           ],
//         }
//       : {};

//     const products = await Product.find(query)
//       .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const total = await Product.countDocuments(query);

//     res.status(200).json({
//       total,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
//   }
// });

// // Update a product
// router.put('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
<<<<<<< HEAD
//     res.status(200).json({ message: 'Product updated successfully', product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

=======
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete a product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.post("/add-product", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     await newProduct.save();

//     io.emit("productUpdated");

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// module.exports = router;
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import the Product model

// Create a product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
<<<<<<< HEAD
=======

    const io = req.app.get("io");
    io.emit("productUpdated");

>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Read products with pagination, sorting, and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc', filter = '' } = req.query;

    const query = filter
      ? {
          $or: [
<<<<<<< HEAD
            { name: { $regex: filter, $options: 'i' } }, // Case-insensitive search in name
            { description: { $regex: filter, $options: 'i' } }, // Case-insensitive search in description
=======
            { name: { $regex: filter, $options: 'i' } },
            { description: { $regex: filter, $options: 'i' } },
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
          ],
        }
      : {};

    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
<<<<<<< HEAD
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
=======
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const io = req.app.get("io");
    io.emit("productUpdated");

    res.status(200).json(updatedProduct);
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
<<<<<<< HEAD
=======

    const io = req.app.get("io");
    io.emit("productUpdated");

>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

<<<<<<< HEAD
=======
// Optional extra route (if you're using it)
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    const io = req.app.get("io");
    io.emit("productUpdated");

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
module.exports = router;
