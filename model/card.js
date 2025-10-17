
class Card {
  constructor({ id, front, back, options, question, correct, choices } = {}) {

    this.front = front ?? question ?? '';
    this.back = back ?? correct ?? '';

    if (Array.isArray(options)) {
      this.options = options.slice();
    } else if (Array.isArray(choices)) {
      this.options = choices.slice();
    } else {
      this.options = null;
    }

    this.id = String(id);

    this.attempts = 0;
    this.correct = false;
    this.lastAnswer = null;
  }

  reset() {
    this.attempts = 0;
    this.correct = false;
    this.lastAnswer = null;
  }
}

module.exports = Card;
