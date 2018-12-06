import usersReducerfrom from './usersReducer';

describe('users.reducers', () => {
  const initialState = { onlineUsers: [], offlineUsers: [] };

  it('should return null as state', () => {
    expect(usersReducerfrom(initialState, { type: 'default_state' })).toEqual(initialState);
  });

  it('should handle fetch_users action', () => {
    const mockUsers = {
      onlineUsers: [{ name: 'Csaba', email: 'csabronc@gmail.com' }],
      offlineUsers: [{ name: 'Janos', email: 'kigyosi.csaba.janos@gmail.com' }],
    };
    const mockAction = { type: 'fetch_users', payload: mockUsers };
    const expectedState = mockUsers;

    expect(usersReducerfrom(initialState, mockAction)).toEqual(expectedState);
  });

  it('should handle fetch_friend_signin action', () => {
    const mockUser = { name: 'Csaba', email: 'csabronc@gmail.com' };
    const mockAction = { type: 'fetch_friend_signin', payload: { user: mockUser } };
    const expectedState = { ...initialState, onlineUsers: [mockUser] };

    expect(usersReducerfrom(initialState, mockAction)).toEqual(expectedState);
  });

  it('should handle fetch_friend_signout action', () => {
    const mockUser = { name: 'Csaba', email: 'csabronc@gmail.com' };
    const mockAction = { type: 'fetch_friend_signout', payload: { user: mockUser } };
    const expectedState = { ...initialState, offlineUsers: [mockUser] };

    expect(usersReducerfrom(initialState, mockAction)).toEqual(expectedState);
  });

  it('should handle remove_onlineuser action', () => {
    const mockUser = { name: 'Csaba', email: 'csabronc@gmail.com' };
    const mockAction = { type: 'remove_onlineuser', payload: { user: mockUser } };
    const expectedState = initialState;

    expect(usersReducerfrom({ ...initialState, onlineUsers: [mockUser] }, mockAction)).toEqual(expectedState);
  });

  it('should handle remove_offlineuser action', () => {
    const mockUser = { name: 'Csaba', email: 'csabronc@gmail.com' };
    const mockAction = { type: 'remove_offlineuser', payload: { user: mockUser } };
    const expectedState = initialState;

    expect(usersReducerfrom({ ...initialState, offlineUsers: [mockUser] }, mockAction)).toEqual(expectedState);
  });
});
