// services/filloutService.js

const axios = require('axios');
const SubmissionDTO = require('../dtos/SubmissionDTO');
const QuestionDTO = require('../dtos/QuestionDTO');

// Function to fetch form submissions from Fillout API
async function getFormSubmissions(formId, queryParams) {
  const apiUrl = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;
  const authToken = 'Bearer sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
  //remove the filters param
  delete queryParams.filters;
  
  // Adding Query Parameters
  const url = new URL(apiUrl);
  Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
  console.log("URL with parameters:", url.toString());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authToken
      }
    });
    return response.data.responses.map(response => {
      const questions = response.questions.map(question =>
          new QuestionDTO(question.id, question.name, question.type, question.value)
      );
      return new SubmissionDTO(
          response.submissionId,
          new Date(response.submissionTime),
          new Date(response.lastUpdatedAt),
          questions
      );
  });
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    throw error;
  }
}

module.exports = {
  getFormSubmissions
};
