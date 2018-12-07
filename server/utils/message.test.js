let expect = require('expect');
let { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage()', () => {

  it('should generate correct location object', () => {
    let lat = 1;
    let lng = 1;
    let from = 'August';
    let response = generateLocationMessage(from, lat, lng);

    expect(response.from).toBe(from);
    expect(response.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(typeof response.createdAt).toBe('number');
  });

});
