import { App } from './app';
import bodyParser from 'body-parser';
import { QuestionController } from './controllers/question/question.controller';
import { QuizController } from './controllers/quiz/quiz.controller';
import { UserController } from './controllers/user/user.controller';
import authCheck from './middleware/auth-check';

const app = new App({
  controllers: [
    new QuestionController(),
    new QuizController(),
    new UserController(),
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    authCheck,
  ],
});

app.listen();
