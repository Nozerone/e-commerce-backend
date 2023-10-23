const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  // be sure to include its associated Products
try {
  const categories = await Category.findAll({
    include: [Product],
  });
  res.json(categories);
} catch (err) {
  res.status(500).json(err);
}
  
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  // be sure to include its associated Products
  try {
    const oneCat = await Category.findOne(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!oneCat) {
      res.status(404).json({message: "Category not found"});
      return;
    }
    res.status(200).json(oneCat);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new category
router.post('/', async (req, res) => {
try {
  const newCat = await Category.create(req.body);
  res.status(200).json(newCat);
} catch (err) {
  res.status(400).json(err);
  console.log(err);
}
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {

  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await category.destroy();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
