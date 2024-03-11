export const BASE_URL = 'http://192.168.5.82:8000/api/';

export const getQuizQuestionsUrl = (quizId) => `${BASE_URL}${quizId}/questions/`;
export const quizUrl = () => `${BASE_URL}`;

