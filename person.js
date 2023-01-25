const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp').
    catch(error => handleError(error));


const personSchema = new mongoose.Schema({
    first: String,
    last: String,
})
    
personSchema.virtual('fullName').get(function () {
    return ` ${this.first} ${this.last}`
})
personSchema.pre('save', async function () {
    this.first = 'YO'
    this.last = 'MAMA'
        console.log('ABOUT TO SAVE!!')
});
personSchema.post('save', async function () {
        console.log('IT SAVEDDDD!!')
});
const Person = mongoose.model('Person', personSchema);


// can add a custom setter to your virtual that will let you set both first and last name via the full name virtual 
// see the docs for example
