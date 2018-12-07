let expect = require('expect');
let { generateMessage } = require('./message')

describe('generateMessage()', () => {

  it('should generate the correct message object', () => {
    let text = 'hi';
    let from = 'August';
    let response = generateMessage(from, text);
    expect(response.text).toBe(text);
    expect(response.from).toBe(from);
    expect(typeof response.createdAt).toBe('number');
  });

});
