import { Router } from 'express'
import { create, get } from '../controllers/room.controller.js'

const router = Router()
router.post('/create', create)
router.get('/:id', get)
export default router