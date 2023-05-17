import { Router } from "express";
import views from '../views/index.js'

const router = Router()

// router.use('/api', apis)
router.use('/', views)

export default router