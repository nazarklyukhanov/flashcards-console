const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const { EOL } = require('os')

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
      .map((line) => '    ' + line)
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

}
}
