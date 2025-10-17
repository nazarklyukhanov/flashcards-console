const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');

class View {
    static async getUserInfo(themes) {
    // eslint-disable-next-line no-return-await
    return await inquirer.prompt([
      { name: 'userName', type: 'input', message: 'Введите своё имя:' },
      {
        name: 'theme',
        type: 'list',
        message: 'Выберите одну из предложенных тем:',
        choices: themes,
      },
    ]);
  }

}