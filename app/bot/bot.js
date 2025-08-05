const directions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];

function getRandomMove() {
  const index = Math.floor(Math.random() * directions.length);
  return directions[index];
}

function decideAction() {
  return {
    move: getRandomMove(),
    action: 'COLLECT'
  };
}

module.exports = { decideAction };