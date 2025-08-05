const { decideAction } = require('./bot');

test('decideAction returns a valid move and action', () => {
  const result = decideAction();
  const validMoves = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
  const validActions = ['COLLECT'];

  expect(validMoves).toContain(result.move);
  expect(validActions).toContain(result.action);
});
