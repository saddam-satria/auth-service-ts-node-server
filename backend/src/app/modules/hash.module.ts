import { compare, genSalt, hash } from 'bcrypt';

const HashModule = () => {
  const hashPassword = async (plain: string): Promise<string> => {
    return await hash(plain, await genSalt(10));
  };
  const comparePassword = async (plain: string, hashedPassword: string): Promise<boolean> => {
    return await compare(plain, hashedPassword);
  };

  return {
    hashPassword,
    comparePassword,
  };
};

export default HashModule();
