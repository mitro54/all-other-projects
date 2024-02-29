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

// Creating the Schema and required/optional fields

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive.']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }

});

// Instance methods

productSchema.methods.greet = function () {
    console.log('Hello its me, the product. Yes i can talk now.')
    console.log(` - from ${this.name}`)
};

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
};

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save;
};

// Static method, this refers to Product instead of the invidual instance.

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 })
}

// Schema called Product

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
};

Product.fireSale().then(res => console.log(res));

// findProduct();


// const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'S' })
// bike.save()
//     .then(data => {
//         console.log('It works')
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error..')
//         console.log(err.errors);
//     });

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 19.99 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log('It works')
//         console.log(data);
//     })
//     .catch(err => {
//         console.log('Error..')
//         console.log(err.errors);
//     });