import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', async () => {});
    it('sucessfully created', async () => {
      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.equal(carMockWithId)
    })

  describe('searching a car', () => {
    it('successfully found', async () => {
      const framesFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(framesFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('XABLAU');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });
});