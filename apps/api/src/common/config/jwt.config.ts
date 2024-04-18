import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  options: {
    issuer: 'genesystechhu',
    audience: 'supplychain.com',
    subject: 'supplychain:user',
    expiresIn: process.env.NODE_ENV !== 'development' ? '6h' : '1d',
    algorithm: 'HS256'
  },
  secret: process.env.JWT_SECRET
}));
