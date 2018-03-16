const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

  // const boundTick = this._tick.bind(this);
class Game {
  constructor(stacks) {
    this.stacks = stacks;
  }

  isValidMove(fromTower, toTower) {
    let fromStack = this.stacks[fromTower];
    let toStack = this.stacks[toTower];

    if (toStack.length === 0) {
      return true;
    }
    return fromStack[fromStack.length - 1] < toStack[toStack.length - 1];
  }

  promptMove(callback) {
    this.print();
    const boundValid = this.isValidMove.bind(this);
    const boundMove = this.move.bind(this);
    reader.question("What stack do you want to move from? ", function (from) {
      const fromTower = parseInt(from);

      reader.question("What stack do you want to move to? ", function (to) {
        const toTower = parseInt(to);

        if (boundValid(fromTower, toTower)) {
          boundMove(fromTower, toTower);
        } else {
        console.log('Invalid move sorry yo!');
        }

        callback();

      });
    });
  }


  move(startTowerIdx, endTowerIdx) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
  }

  print() {
    for (let i = 0; i < this.stacks.length; i++) {
      console.log( `${i}: ` + this.stacks[i]);
    }

  }

  isWon() {

    return (this.stacks[0].length === 0) &&
      (this.stacks[1].length === 0 || this.stacks[2].length === 0);
  }

  run(completionCallback) {
  this.promptMove(() => {
      if (!this.isWon()) {
        this.run(completionCallback);
      } else {
        completionCallback();
      }
    });

    //until all desks are on the second or third tower
      // player moves discs one at a time
      // player can only move smaller discs onto larger discs.
  }

}

const game = new Game([[3, 2, 1], [], []]);
game.run(() => {
  reader.question('Do you want to play again?', function(answer) {
    if (answer === 'yes') {
      console.log('print yes');
    } else {
      reader.close();
    }
  });
});
// console.log(game.isValidMove([3, 2, 1], []));
