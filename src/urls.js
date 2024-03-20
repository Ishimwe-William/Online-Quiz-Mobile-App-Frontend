export const BASE_URL = 'https://01f3-41-186-78-121.ngrok-free.app/api/';

export const getQuizQuestionsUrl = (quizId) => `${BASE_URL}${quizId}/questions/`;
export const setQuestionAnswersUrl = (quizId, questionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/`;
export const editAnswersUrl = (quizId, questionId,optionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/${optionId}/`;
export const getQuizUrl = () => `${BASE_URL}`;

