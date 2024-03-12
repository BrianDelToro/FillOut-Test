// controllers/formController.js

const filloutService = require('../services/filloutService');
const filtersService = require('../services/filtersService');
const filterParser = require('../parsers/filterParser');

// Controller function to handle fetching and filtering form responses
async function getFilteredResponses(req, res) {
  const { formId } = req.params;
  const filterString = req.query.filters;
  const params = req.query;
  console.log(req.query);
  try {
    
    // Fetch form submissions from Fillout API
    const formSubmissions = await filloutService.getFormSubmissions(formId,params);
    if(filterString == undefined)
      res.json(formSubmissions);
    // Parse filters from query string
    const filters = filterParser.parseFilters(filterString);
    // Apply filtering logic (example: filtering based on query parameters)
    const filteredResponses = filtersService.applyFilters(formSubmissions, filters)

    // Respond with filtered responses
    res.json(filteredResponses);
  } catch (error) {
    console.error('Error fetching form responses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getFilteredResponses
};
