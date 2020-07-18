import { getAllQuizzes } from '../../../../../src/controllers/quiz/api/quiz.get-all';
import { Quiz } from '../../../../../src/models/Quiz';
import { ServerResponse } from '../../../../../src/interfaces/ServerResponse.interface';

describe('quiz.get-all', () => {
  let mockReq: any;
  let mockRes: any;
  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis,
      json: jest.fn().mockReturnThis,
    };
  });
  describe('getAllQuizzes', () => {
    it('should return no quizzes found', async () => {
      const expectedResult: any = [];
      Quiz.find = jest.fn().mockResolvedValue(expectedResult);

      let statusCode: number = 0;
      let result: any = {};
      const message = 'No quizzes found! Dare to add some?';
      mockRes = {
        status: (code: number) => {
          statusCode = code;
        },
        json: (res: ServerResponse) => {
          result = res;
        },
      };

      await getAllQuizzes(mockReq, mockRes);

      expect(statusCode).toEqual(200);
      expect(result.success).toEqual(true);
      expect(result.data).toEqual(expectedResult);
      expect(result.message).toEqual(message);
    });

    it('should return 200 with quizzes found', async () => {
      const expectedResult: any = [
        {
          _id: 'someId',
          averageScore: 0,
          creatorId: 'someCreatorId',
          creatorUsername: 'someCreatorUsername',
          dateCreated: '2020-07-18T05:37:57.847Z',
          description: 'someDescription',
          name: 'someName',
          questions: [],
          solved: [],
        },
      ];
      Quiz.find = jest.fn().mockResolvedValue(expectedResult);

      let statusCode: number = 0;
      let result: any = {};
      const message = 'Quizzes loaded successfully!';

      mockRes = {
        status: (code: number) => {
          statusCode = code;
        },
        json: (res: ServerResponse) => {
          result = res;
        },
      };
      await getAllQuizzes(mockReq, mockRes);

      expect(statusCode).toEqual(200);
      expect(result.success).toEqual(true);
      expect(result.data.length).toEqual(1);
      expect(result.data).toEqual(expectedResult);
      expect(result.message).toEqual(message);
    });

    it('should return 500 invalid request', async () => {
      const error: any = { message: 'Some error!' };
      Quiz.find = jest.fn().mockRejectedValue(error);

      let statusCode: number = 0;
      let result: any = {};
      mockRes = {
        status: (code: number) => {
          statusCode = code;
        },
        json: (res: ServerResponse) => {
          result = res;
        },
      };
      await getAllQuizzes(mockReq, mockRes);

      expect(statusCode).toEqual(500);
      expect(result.success).toEqual(false);
    });
  });
});
