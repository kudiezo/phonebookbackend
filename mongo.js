const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.5kub4.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length>3) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    
    /** ###### INSERT NEW PERSON TO MongoDB ######## */
    const person = new Person({
        name: newName,
        number: newNumber,
    }) 
    
    person.save().then(result => {
        console.log(`added ${newName} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    /** ########### GET PEOPLE FROM MongoDB ############# */
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}