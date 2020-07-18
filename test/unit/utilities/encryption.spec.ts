import {
  generateSalt,
  generateHashedPassword,
} from '../../../src/utilities/encryption';

describe('encription.ts', () => {
  it('should generate salt with expected length', () => {
    const expectedLength = 172;

    const salt: string = generateSalt();

    expect(salt).toBeDefined();
    expect(salt.length).toEqual(expectedLength);
  });

  it('should generate expected hash', () => {
    const salt: string = 'y6vlLUJlALVhPQ9jvR89W86c8UQSKuQb+5ebF0CFpaXjIHDa2wx';
    const password: string = 'password!@#';
    const hashedPass: string = generateHashedPassword(salt, password);

    const expectedHash: string =
      'd0120918e0d476de682f1a2eff72c24e82c1d7fd225a5fe8c808d8be9e965fad';

    expect(hashedPass).toEqual(expectedHash);
  });

  it('should generate different hash with same salt and different password', () => {
    const salt: string = 'y6vlLUJlALVhPQ9jvR89W86c8UQSKuQb+5ebF0CFpaXjIHDa2wx';
    const firstPassword: string = 'password1';
    const secondPassword: string = 'password2';

    const firstHash: string = generateHashedPassword(salt, firstPassword);
    const secondHash: string = generateHashedPassword(salt, secondPassword);

    expect(firstHash).not.toEqual(secondHash);
  });

  it('should geenerate diffeerent hash with differeent salt and same password', () => {
    const saltOne: string =
      '1y6vlLUJlALVhPQ9jvR89W86c8UQSKuQb+5ebF0CFpaXjIHDa2wx';
    const saltTwo: string =
      '2y6vlLUJlALVhPQ9jvR89W86c8UQSKuQb+5ebF0CFpaXjIHDa2wx';
    const password: string = 'password';

    const firstHash: string = generateHashedPassword(saltOne, password);
    const secondHash: string = generateHashedPassword(saltTwo, password);

    expect(firstHash).not.toEqual(secondHash);
  });
});
