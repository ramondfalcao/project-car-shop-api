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
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findOneAndDelete');
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating a car', async () => {
    it('sucessfully created', async () => {
      const newCar = await carModel.create(carMock)
      expect(newCar).to.be.deep.equal(carMockWithId)
    })
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('XABLAU');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('List cars', () => {
    it('successfully found', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('Updating a car', () => {
    it('Successfully Updating', async () => {
      const carUpdating = await carModel.update('62cf1fc6498565d94eba52cd', carMock);
      expect(carUpdating).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.update('XABLAU', carMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('Deleting a car', () => {
    it('Successfully Deleting', async () => {
      const carDeleting = await carModel.delete('62cf1fc6498565d94eba52cd');
      expect(carDeleting);
    });

    it('_id not found', async () => {
      try {
        await carModel.delete('XABLAU');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });
});