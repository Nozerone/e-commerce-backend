const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
// find a single product by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    const oneProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    if (!oneProduct) {
      res.status(404).json({ message: "No products available" });
      return;
    }
    res.status(200).json(oneProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.destroy();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
