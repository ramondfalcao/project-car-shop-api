import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', async () => {});
    it('sucessfully created', async () => {
      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.equal(carMockWithId)
    })
});