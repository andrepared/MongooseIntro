const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp').
    catch(error => handleError(error));

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        min: 0
    },

    isOnSale: {
        type: Boolean,
        default: false,
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
            },
    },
    size: {
        type: String, 
        enum: ['S', 'M', 'L']
        }
    
}); 
productSchema.methods.toggleisOnSale = function () {
    this.isOnSale = !this.isOnSale; 
    return this.save();
}
productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat); 
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {isOnSale: true, price: 0})  
}

productSchema.methods.greet = function () {
    console.log('HIII!!!!')
    console.log(`- from ${this.name}`)
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Tire Pump' });
    console.log(foundProduct);
    await foundProduct.toggleisOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct);

}
Product.fireSale().then(res => console.log(res))
// findProduct();
// const Product = mongoose.model('Product', productSchema);

// const bike = new Product({ name: 'Tire Pump', price: 50, categories: ['Cycling', 'Racing', 'Safety'] })
// bike.save()
//     .then(data => {
//     console.log('OMG IT WORKED')
//     console.log(data)
//     })
//     .catch(err => {
//         console.log('OH NO, SOMETHING WENT WRONG')
//         console.log(err)
//     })

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 100 }, { new: true }, {runValidators: true})
// .then(data => {
//     console.log('OMG IT WORKED')
//     console.log(data)
//     })
//     .catch(err => {
//         console.log('OH NO, SOMETHING WENT WRONG')
//         console.log(err)
//     })