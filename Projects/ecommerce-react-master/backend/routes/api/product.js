const express = require('express')
const asyncHandler = require('express-async-handler');
const { Product, Category, Review, Tag, Size, ProductSize, ProductTag } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.findAll();
    res.json(products)
}))


router.get('/:id', asyncHandler(async (req, res) => {
    const productId = await parseInt(req.params.id, 10);
    const productInfo = await Product.findByPk(productId, {
        include: [
            { model: Category },
            { model: Review },
            {
                model: Tag,
                through: { attributes: [] },
            },
            {
                model: Size,
                through: { attributes: ['inventoryNum'] },
            }
        ]
    });
    res.json(productInfo)
}))

router.get('/category/:id', asyncHandler(async (req, res) => {
    const categoryId = await parseInt(req.params.id, 10);
    const category = await Product.findAll(categoryId, {
        include: [
            { model: Category }
        ]
    })
    res.json(categoryId)
}))


module.exports = router;
