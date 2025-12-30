const express = require('express');
const { createPropertyValidator } = require('../Validators/PropertyValidator');
const {
    createPropertyController,
    getPropertyByIdController,
    getPropertiesController,
    updatePropertyController,
    deletePropertyController,
    // filterPropertiesController,
    getPropertiesByTypeController,
    filterPropertiesController
} = require('../Controllers/propertyController');

const router = express.Router();

router.post('/createproperty', createPropertyValidator, createPropertyController);
router.get("/filterbytype", getPropertiesByTypeController);
router.get("/filter", filterPropertiesController);
router.get('/', getPropertiesController);
// router.get("/", filterPropertiesController);
router.get('/:id', getPropertyByIdController);
router.delete('/:id', deletePropertyController);
router.put('/:id', updatePropertyController);

module.exports = router;