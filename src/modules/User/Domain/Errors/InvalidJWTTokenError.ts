import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidJWTTokenError extends CoreError {
  constructor() {
    super(
      'Invalid JWT TOKEN. I broke your teapot. Use this key to create JWT VALID "S0tLS0sgWU9VIFJFQUxZPz8/IFBMRUFTRSBCT1kgSSBBTSBBIEhBQ0tFUiwgeW91IGxlYXJuaW5nPz8="',
    );
    this.name = 'InvalidJWTTokenError';
  }
}
