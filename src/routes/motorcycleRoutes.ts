import { Router } from 'express';
import MotorCycleController from '../controllers/motorcycleController';
import MotorcycleModel from '../models/motorcycleModel';
import MotorCycleService from '../services/motorcycleService';

const motorCycleRoute = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorCycleService(motorcycle);
const motorCycleController = new MotorCycleController(motorcycleService);

motorCycleRoute.post('/', (req, res) => motorCycleController.create(req, res));
motorCycleRoute.put('/:id', (req, res) => motorCycleController.update(req, res));
motorCycleRoute.delete('/:id', (req, res) => motorCycleController.delete(req, res));
motorCycleRoute.get('/', (req, res) => motorCycleController.read(req, res));
motorCycleRoute.get('/:id', (req, res) => motorCycleController.readOne(req, res));

export default motorCycleRoute;