import authReducer from './authReducer';

describe('auth.reducers', () => {
  it('should return null as state', () => {
    expect(authReducer(undefined, { type: 'default_case' })).toEqual(null);
  });

  it('should return user as part of auth state', () => {
    const mockAuth = { name: 'Csaba', email: 'csabronc@gmail.com' };
    const mockAction = { type: 'fetch_user', payload: mockAuth };

    expect(authReducer(undefined, mockAction)).toEqual(mockAuth);
  });
});
