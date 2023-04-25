const http = require('http')

const moment = require('moment')

let currentDate = moment()

let validDate = currentDate.isValid()
// console.log(validDate)
// currentDate = currentDate.format('MMM Do YY')
// console.log(currentDate)
let bornDate = moment('19870107')
let validBorn = bornDate.isValid()
// console.log(validBorn)
// bornDate = bornDate.format('MMM Do YY')
// console.log(bornDate)


let days = currentDate.diff(bornDate, 'years')



console.log(days)

const server = http.createServer((req, res) => {
 res.end('Server up')
})

const PORT = 8080
const callback = () => {
 console.log(`Server ready on port: ${PORT}`)
}

server.listen(
 PORT, callback
)