import authCheck from './auth-check';

const authSampleToken: string =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjExYTg4MjkzZTQ5MTU2OWY3OWEwNDkiLCJ1c2VybmFtZSI6Iml2YW5jaG9fMSIsImlhdCI6MTU5NDk5Mjc3Nn0.nEx_BRA5ouunu0c9wFeZm-MAN_X57z4X0bXsoYZU1cQ';

describe('auth-check.ts', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis,
      end: jest.fn().mockReturnThis,
      locals: {},
    };
  });

  it('should pass on correct auth token', () => {
    let nextCalled = false;
    let next = function () {
      nextCalled = true;
    };

    mockReq.headers['authorization'] = authSampleToken;

    authCheck(mockReq, mockRes, next);

    expect(nextCalled).toEqual(true);
  });

  it('should return 401 response when auth headers are not defined', () => {
    let nextCalled = false;
    let next = function () {
      nextCalled = true;
    };

    let statusCode: number = 0;
    const expectedCode: number = 401;
    mockRes.status = function (code: number) {
      statusCode = code;
      return { end: () => {} };
    };

    mockReq.headers['authorization'] = undefined;

    authCheck(mockReq, mockRes, next);

    expect(statusCode).toEqual(expectedCode);
    expect(nextCalled).toEqual(false);
  });

  it('should return 403 response when there is error in verify method', () => {
    let nextCalled = false;
    let next = function () {
      nextCalled = true;
    };

    let statusCode: number = 0;
    const expectedCode: number = 403;
    mockRes.status = function (code: number) {
      statusCode = code;
      return { end: () => {} };
    };

    mockReq.headers['authorization'] = 'bearer ';

    authCheck(mockReq, mockRes, next);

    expect(statusCode).toEqual(expectedCode);
    expect(nextCalled).toEqual(false);
  });
});
