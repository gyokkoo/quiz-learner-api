import { getQuizById } from '../../../../../src/controllers/quiz/api/quiz.get';
import { Quiz } from '../../../../../src/models/Quiz';
import { ServerResponse } from '../../../../../src/interfaces/ServerResponse.interface';
import { User } from '../../../../../src/models/User';
import { Question } from '../../../../../src/models/Question';

describe('quiz.get', () => {
  let mockReq: any;
  let mockRes: any;
  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis,
      json: jest.fn().mockReturnThis,
    };
  });
  describe('getQuizById', () => {
    it('should return 200 if quiz found', async () => {
      const questions = ['someQuestion'];
      const getQuizByIdResult: any = {
          averageScore: 0,
          creatorId: 'someId',
          creatorUsername: 'someUserName',
          dateCreated: '2020-07-17T20:32:37.540Z',
          description: 'someDescription',
          name: 'someName',
          questions: questions,
          solved: [],
          _id: 'someId',
        };

      const getUserByIdResult: any = {
        username: 'someUserName',
      };

      Quiz.findById = jest.fn().mockResolvedValue(getQuizByIdResult);
      User.findById = jest.fn().mockResolvedValue(getUserByIdResult);
      Question.find = jest.fn().mockResolvedValue(questions);

      let statusCode: number = 0;
      let result: any = {};
      const message = 'Questions loaded!';

      mockRes = {
        status: (code: number) => {
          statusCode = code;
        },
        json: (res: ServerResponse) => {
          result = res;
        },
      };
      await getQuizById(mockReq, mockRes);

      expect(statusCode).toEqual(200);
      expect(result.success).toEqual(true);
      expect(result.allQuestions.length).toEqual(1);
      expect(result.message).toEqual(message);
      expect(result.creator).toEqual(getQuizByIdResult.creatorUsername);
    });

    it('should return 500 if quiz with id not found', async () => {
      const error: any = { message: 'Some error!' };
      const getUserByIdResult: any = {
        username: 'someUserName',
      };

      Quiz.findById = jest.fn().mockRejectedValue(error);

      let statusCode: number = 0;
      let result: any = {};
      const id = 'someInvalidId';
      const message = `Cannot find quiz with id ${id}`;
      mockReq = {
        params: {
            id: id,
        }
      };
      mockRes = {
        status: (code: number) => {
          statusCode = code;
        },
        json: (res: ServerResponse) => {
          result = res;
        },
      };
      await getQuizById(mockReq, mockRes);

      expect(statusCode).toEqual(500);
      expect(result.success).toEqual(false);
      expect(result.message).toEqual(message);
    });

    it('should return 500 if user with id not found', async () => {
        const error: any = { message: 'Some error!' };
        
        const getQuizByIdResult: any = 
            {
              averageScore: 0,
              creatorId: 'someInvalidUser',
              creatorUsername: 'someCreatorUsername',
              dateCreated: '2020-07-17T20:32:37.540Z',
              description: 'someDescription',
              name: 'someName',
              questions: ['someQuestion'],
              solved: [],
              _id: 'someId',
            };
        Quiz.findById = jest.fn().mockResolvedValue(getQuizByIdResult);
        User.findById = jest.fn().mockRejectedValue(error);
  
        let statusCode: number = 0;
        let result: any = {};
        const id = 'someId';
        const userId = 'someInvalidUser';
        const message = `Cannot find user with id ${userId}`;
        mockReq = {
            params: {
                id: id,
            }
        };
        mockRes = {
          status: (code: number) => {
            statusCode = code;
          },
          json: (res: ServerResponse) => {
            result = res;
          },
        };
        await getQuizById(mockReq, mockRes);
  
        expect(statusCode).toEqual(500);
        expect(result.success).toEqual(false);
        expect(result.message).toEqual(message);
      });
  });
});
