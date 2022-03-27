const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((dbCategoryData) => {
      // serialize the data
      const categories = dbCategoryData.map((category) => category.get({ plain: true }));
      // return the categories
      res.json(categories);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
    .then((dbCategoryData) => {
      // serialize the data
      const category = dbCategoryData.get({ plain: true });
      // return the category
      res.json(category);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => {
      // serialize the data
      const category = dbCategoryData.get({ plain: true });
      // return the category
      res.json(category);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((dbCategoryData) => {
      // serialize the data
      const category = dbCategoryData.get({ plain: true });
      // return the category
      res.json(category);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      // serialize the data
      const category = dbCategoryData.get({ plain: true });
      // return the category
      res.json(category);
    }) 
});

module.exports = router;
