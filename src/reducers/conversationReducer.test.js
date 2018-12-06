import conversationReducer from './conversationReducer';

describe('conversation.reducers', () => {
  const initialState = { recipient: null, messages: [] };

  it('should return null as state', () => {
    expect(conversationReducer(initialState, { type: 'default_state' })).toEqual(initialState);
  });

  it('should handle fetch_recipient action', () => {
    const mockRecipient = { recipient: { name: 'Csaba\'s partner', email: 'csabaspartner@gmail.com' } };
    const mockAction = { type: 'fetch_recipient', payload: mockRecipient };
    const expectedState = { ...initialState, ...mockRecipient };

    expect(conversationReducer(initialState, mockAction)).toEqual(expectedState);
  });

  it('should handle fetch_conversation action', () => {
    const mockMessages = { messages: [{ sender: 'user_id', date: '19:20', content: 'hello world', type: 'TEXT' }] };
    const mockAction = { type: 'fetch_conversation', payload: { conversation: mockMessages } };
    const expectedState = { ...initialState, ...mockMessages };

    expect(conversationReducer(initialState, mockAction)).toEqual(expectedState);
  });

  it('should handle fetch_message action', () => {
    const mockMessages = { message: {
      sender: 'user_id',
      date: '19:20',
      content: 'hello world',
      type: 'TEXT',
    },
    };
    const mockAction = { type: 'fetch_message', payload: mockMessages };
    const expectedState = { ...initialState, messages: [mockMessages.message] };

    expect(conversationReducer(initialState, mockAction)).toEqual(expectedState);
  });
});
