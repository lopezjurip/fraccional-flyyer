// Created with create-flyyer-app@1.17.0

const process = require('process');
const {config} = require('@flyyer/types');
require('dotenv').config();

module.exports = config({
  engine: 'react-typescript',
  key: process.env.FLYYER_KEY,
  deck: 'fraccional',

  // Optionals
  name: 'Fraccional Ventures',
  description: 'Share images for https://fraccional.ventures',
  homepage: 'https://fraccional.ventures',
  keywords: ['flyyer', 'react', 'tailwind'],
  private: false,
  // repository: 'https:/github.com/useflyyer/flyyer-official',
  sizes: ['THUMBNAIL', 'BANNER', 'SQUARE', 'STORY'],
});
