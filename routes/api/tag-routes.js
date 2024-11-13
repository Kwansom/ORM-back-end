const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag, // using join table to link
        as: "tags",
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((tagData) => {
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: "tag",
        attributes: ["id", "product_name", "price", "stock"],
      },
    ],
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    name: req.body.name, // tag name passed in the request body
  })
    .then((tagData) => {
      // return created tag data as JSON
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id, // id paramenter to find the tag to update
      },
    }
  )
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json({ message: "Tag deleted succesfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
