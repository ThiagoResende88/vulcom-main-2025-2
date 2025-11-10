import { Router } from 'express'
import controller from '../controllers/cars.js'
import validate from '../middleware/validate.js'
import carSchema from '../models/Car.js'

const router = Router()

router.post('/', validate(carSchema), controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', validate(carSchema), controller.update)
router.delete('/:id', controller.delete)

export default router