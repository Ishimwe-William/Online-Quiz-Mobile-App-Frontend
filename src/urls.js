export const BASE_URL = ' https://ee39-102-22-146-194.ngrok-free.app/api/';

export const getQuizQuestionsUrl = (quizId) => `${BASE_URL}${quizId}/questions/`;
export const setQuestionAnswersUrl = (quizId, questionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/`;
export const editAnswersUrl = (quizId, questionId,optionId) => `${BASE_URL}${quizId}/questions/${questionId}/options/${optionId}/`;
export const getQuizUrl = () => `${BASE_URL}`;
export const registerUrl = () => `${BASE_URL}users/register/`;
export const loginUrl = () => `${BASE_URL}users/login/`;
