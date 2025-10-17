const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const { EOL } = require('os');
const gradient = require('gradient-string');
class View {
  static async getUserInfo(themes) {
    // eslint-disable-next-line no-return-await
    return await inquirer.prompt([
      { name: 'userName', type: 'input', message: 'Введите своё имя:' },
      {
        name: 'theme',
        type: 'list',
        message: 'Выберите тему для решения:',
        choices: themes,
      },
    ]);
  }

  static async greetUser(username) {
    const text = figlet.textSync(
      ` ${EOL}                         Good luck, ${username} !`,
      {
        font: 'Bloody',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      },
    );

    const padded = text
      .split('\n')
      .map((line) => `    ${line}`)
      .join('\n');

    console.log(gradient.rainbow.multiline(padded));
  }

  static async greetings() {
    (async () => {
      const data = await new Promise((resolve, reject) => {
        figlet(
          '                                Flashcards',
          { font: 'Bloody' },
          (err, txt) => (err ? reject(err) : resolve(txt)),
        );
      });
      console.log(gradient.rainbow.multiline(data));
    })();

    const terminalWidth = process.stdout.columns || 80;
    const msg = `ДОБРО ПОЖАЛОВАТЬ В ИГРУ! \n\n`;
    const padding = Math.max(0, Math.floor((terminalWidth - msg.length) / 2.05));
    console.log(' '.repeat(padding) + chalk.hex('#ece13dff')(msg));

    process.stdout.write(EOL);
    await new Promise((r) => setTimeout(r, 50));
  }

  static async askQuestion(q) {
    const choices = q.choices.map((choice, index) => ({
      name: choice,
      value: index,
    }));

    const { userAnswer } = await inquirer.prompt([
      {
        type: 'list',
        name: 'userAnswer',
        message: q.question,
        choices,
      },
    ]);

    return userAnswer;
  }

  static showMiddleRes(isTrue, q) {
    if (isTrue) {
      console.log(
        chalk.greenBright(
          `${EOL}      
          МОЛОДЕЦ!
${EOL}`,
        ),
      );
    } else {
      console.log(
        chalk.red(
          `${EOL} 
          НЕВЕРНЫЙ ОТВЕТ!
    ${EOL}`,
        ),
      );
    }
  }

  static showResult(score, total) {
    if (score < 10) {
      const text = figlet.textSync(` You Loser `, {
        font: 'Bloody',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      });

      const padded = text
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n');
      console.log(
        chalk.magenta(
          `                           Не повезло, у тебя ${score} очков из ${total}${EOL}`,
        ),
      );
      console.log(chalk.red(padded));
    } else if (score === 10) {
      const text = figlet.textSync(` You winner `, {
        font: 'Bloody',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      });

      const padded = text
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n');
      console.log(
        chalk.magenta(
          `                           Ты молодец, у тебя ${score} очков из ${total}${EOL}`,
        ),
      );
      console.log(chalk.green(padded));
    }
  }
}

module.exports = View;
