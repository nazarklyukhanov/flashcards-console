class Card {
  constructor(question, choices, correct ) {
    this.question = question
    this.choices = choices
    this.correct = correct
  }

  reset() {
    this.attempts = 0;
    this.isGuessed = false;
    this.lastAnswer = null;
  }
}

module.exports = Card;
