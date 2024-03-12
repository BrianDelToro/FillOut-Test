const Filter = require('../models/filter');

class FilterParser {
    static parseFilters(filterString) {
        try {
            const filters = JSON.parse(filterString);
            return filters.map(filter => {
                return new Filter(filter.id, filter.condition, filter.value);
            });
        } catch (error) {
            console.error('Error parsing filters:', error);
            throw new Error('Error parsing filters');
        }
    }
}

module.exports = FilterParser;
