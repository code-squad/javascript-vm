
describe("what is describe means?", () => {
  test('This is a sample', () => {
    expect(true).toBe(true);
  });

  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });

  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
});
