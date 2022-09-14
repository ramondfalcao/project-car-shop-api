import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', async () => {
    it('Sucess', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId)
    })
    it('Failure', async () => {
      let error;
			try {
				await carService.create({});
			} catch (err) {
        error = err
			}

      expect(error).to.be.instanceOf(ZodError);
    })
  });

});