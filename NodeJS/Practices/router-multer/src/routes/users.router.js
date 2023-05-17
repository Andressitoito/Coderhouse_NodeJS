import { Router } from 'express'

const router = Router()
const users = []

router.get('/', (req, res) => {
 res.send({
  users
 })
})

router.post('/', (req, res) => {

 const user = req.body

 users.push(user)

 res.send({
  status: 200,
  success: true,
  users
 })
})

export default router