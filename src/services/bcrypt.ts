import { compare, hash } from 'bcryptjs';
 
async function generateHash(payload: string): Promise<string> {
  return hash(payload, Number(process.env.NEXT_PUBLIC_HASH_SALT));
}

async function compareHash(payload: string, hashed: string): Promise<boolean> {
  return compare(payload, hashed);
}

export { generateHash, compareHash };
