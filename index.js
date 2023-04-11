#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const {hideBin } = require('yargs/helpers');
const readline = require('node:readline');

let count = 0;
let countWin = 0;

const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv._[0];

if (fileName == undefined) {
    console.log('Не указано имя файла для логирования результатов');
    process.exit(0);
}

fs.open(fileName, 'r', (err) => {
    if (err) {
        console.error('Ошибка - файл не найдено');
    }
});

const readInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
  });
  
  readInterface
    .on('line', (line) => {
      count++;
  
      if (JSON.parse(line).result == 'Выигрыш') {
        countWin++;
      }
    })
    .on('close', () => {
      console.log(
        `Общее количество партий: ${count}` +
          `\nКоличество выигранных партий: ${countWin}` +
          `\nКоличество проигранных партий: ${count - countWin}` +
          `\nПроцентное соотношение выигранных партий: ${Math.floor(
            (countWin / count) * 100
          )} %`
      );
    });