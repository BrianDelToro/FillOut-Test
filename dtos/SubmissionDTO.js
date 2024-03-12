class SubmissionDTO {
    constructor(submissionId, submissionTime, lastUpdatedAt, questions) {
        this.submissionId = submissionId;
        this.submissionTime = submissionTime;
        this.lastUpdatedAt = lastUpdatedAt;
        this.questions = questions || [];
    }
}

module.exports = SubmissionDTO;