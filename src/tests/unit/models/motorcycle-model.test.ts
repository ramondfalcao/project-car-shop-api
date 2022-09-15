import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';
import MotorcycleModel from '../../../models/motorcycleModel';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', async () => {
    it('sucessfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock)
      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId)
    })
  });
});