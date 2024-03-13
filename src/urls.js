export const BASE_URL = ' https://bb82-2c0f-eb68-60e-9700-2c21-f72b-720-8c07.ngrok-free.app/api/';

export const getQuizQuestionsUrl = (quizId) => `${BASE_URL}${quizId}/questions/`;
export const setQuestionAnswersUrl = (quizId, questionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/`;
export const editAnswersUrl = (quizId, questionId,optionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/${optionId}/`;
export const getQuizUrl = () => `${BASE_URL}`;

