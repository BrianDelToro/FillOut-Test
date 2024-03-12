// services/filtersService.js

require('../dtos/SubmissionDTO');
require('../dtos/QuestionDTO');


function applyFilters(formSubmissions, filters){
    console.log("formSubmission Object looks like:");
    //console.log(formSubmissions);
    console.log(filters);
    return formSubmissions.filter(response => {
        let passedAllFilters = true;
        response.questions.forEach(question => {
            filters.forEach(filter => {
                if (question.id === filter.id) {
                    // Apply filter condition
                    switch (filter.condition) {
                        case 'equals':
                            if (question.value !== filter.value) {
                                passedAllFilters = false;
                            }
                            break;
                        case 'does_not_equal':
                            if (question.value === filter.value) {
                                passedAllFilters = false;
                            }
                            break;
                        case 'greater_than':
                            if (parseFloat(question.value) <= parseFloat(filter.value)) {
                                passedAllFilters = false;
                            }
                            break;
                        case 'less_than':
                            if (parseFloat(question.value) >= parseFloat(filter.value)) {
                                passedAllFilters = false;
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
          })
        return passedAllFilters;
    });
}

module.exports = {
    applyFilters
  };