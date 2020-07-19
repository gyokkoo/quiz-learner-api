# quiz-learner-api

![CI](https://github.com/gyokkoo/quiz-learner-api/workflows/CI/badge.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Server side project for creating, customizing and editing quizzes!

* POST https://quiz-learner.herokuapp.com/аuth/login
* POST https://quiz-learner.herokuapp.com/аuth/register
* GET https://quiz-learner.herokuapp.com/аuth/getUserById/{id}
* POST https://quiz-learner.herokuapp.com/quiz/create
* POST https://quiz-learner.herokuapp.com/quiz/addQuestion
* GET https://quiz-learner.herokuapp.com/quiz/getAllQuizzes
* GET https://quiz-learner.herokuapp.com/quiz/getQuestions/{id}
* GET https://quiz-learner.herokuapp.com/quiz/getQuizById/{id}
* POST https://quiz-learner.herokuapp.com/quiz/addSolvedQui
* GET https://quiz-learner.herokuapp.com/quiz/getQuestionById/{id}
* PUT https://quiz-learner.herokuapp.com/quiz/editQuestion/{id}
* DELETE https://quiz-learner.herokuapp.com/quiz/deleteQuestion/{id}
