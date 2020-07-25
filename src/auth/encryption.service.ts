import { Injectable } from '@nestjs/common';

import { compare, hash, genSalt } from 'bcrypt';

@Injectable()
export class EncryptionService {
  genSalt(): Promise<string> {
    return genSalt();
  }

  hash(input: string, salt: string): Promise<string> {
    return hash(input, salt);
  }

  compare(input: string, salt: string): Promise<boolean> {
    return compare(input, salt);
  }
}

export const encryptionService = new EncryptionService();
