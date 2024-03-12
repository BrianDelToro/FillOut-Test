// routes/formRoutes.js

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// Define route for filtered responses
router.get('/:formId/filteredResponses', formController.getFilteredResponses);

module.exports = router;
