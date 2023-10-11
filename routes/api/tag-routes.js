const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tags.findAll({
      include: [Product],
    });
    res.json(tags);
} catch (err) {
  res.status(500).json(err);
}
  });

  // find a single tag by its `id`
      router.get('/:id', async (req, res) => {
        // be sure to include its associated Product data
        try {
          const oneTag = await Tag.findOne({
            include:[
              {
                model: Product,
              },
            ],
           
          });
      
          if (!oneTag) {
            res.status(404).json({message: "No tags available"});
            return;
          }
          res.status(200).json(oneTag);
        } catch (err) {
          res.status(500).json(err);
        }
      });
      
      // create a new tag
   router.post('/', async (req, res) => {
     try {
       const newTag = await Tag.create(req.body);
       if (req.body.Product) {
         // handle the Product association here

       }
       res.status(200).json(newTag);
     } catch (err) {
       res.status(400).json(err);
       console.log(err);
     }
   });


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    await category.destroy();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
