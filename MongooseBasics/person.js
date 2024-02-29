const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('Connection established.')
    })
    .catch(err => {
        console.log('Error..')
        console.log(err)
    });

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
});

personSchema.pre('save', async function () {
    this.first = 'Yo';
    this.last = 'Mama';
    console.log('About to save');
})
personSchema.post('save', async function () {
    console.log('Just saved');
})

const Person = mongoose.model('Person', personSchema);

