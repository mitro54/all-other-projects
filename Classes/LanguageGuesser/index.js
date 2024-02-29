const franc = require('franc');
const langs = require('langs');
const colors = require('colors');
const input = process.argv[2];
const langCode = franc(input);

if (langCode === 'und') {
    console.log('Please provide a larger sample.'.red)
} else {

    const language = langs.where('3', langCode)
    console.log(`Hmm, im guessing: ${language.name}`.green)
}