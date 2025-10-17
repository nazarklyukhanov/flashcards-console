const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const { EOL } = require('os');

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
    const text = figlet.textSync(` ${EOL}Хорошей игры, дорогой друг, ${username} !`, {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    });

    const padded = text
      .split('\n')
      .map((line) => `    ${line}`)
      .join('\n');

    console.log(chalk.green(padded));
  }

  static async greetings() {
    const data = await new Promise((resolve, reject) => {
      figlet('Flashcards Game', { font: 'ANSI Shadow' }, (err, txt) =>
        err ? reject(err) : resolve(txt),
      );
    });

    const lines = data.split('\n');
    for (const line of lines) {
      console.log(chalk.hex('#fff87dff')(line));
      await new Promise((r) => setTimeout(r, 200));
    }
    
    const terminalWidth = process.stdout.columns || 80;
    const msg = `ДОБРО ПОЖАЛОВАТЬ В ИГРУ!`;
    const padding = Math.max(0, Math.floor((terminalWidth - msg.length) / 3.2));
    console.log(' '.repeat(padding) + chalk.hex('#fff87dff')(msg));

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
}
