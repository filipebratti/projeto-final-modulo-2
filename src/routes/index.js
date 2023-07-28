const { Router } = require('express')
const { routesFromUser } = require('./user.routes')
const { routesFromDeposit } = require('./deposit.routes')
const { routesFromMedicine } = require('./medicine.routes')

const routes = new Router()

routes.use('/api', [  
  routesFromUser(),
  routesFromDeposit(),
  routesFromMedicine()
])

module.exports = routes