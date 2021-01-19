import express from 'express'
const router = express.Router()
import { getCars, getCarById, deleteCar, createCar, updateCar} from '../controllers/carController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').get(getCars).post(protect, admin, createCar)
router.route('/:id').get(getCarById).delete(protect, admin, deleteCar).put(protect, admin, updateCar)

export default router