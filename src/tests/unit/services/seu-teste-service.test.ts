import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne').onCall(0).resolves(carMockWithId).onCall(1).resolves(null); 
    sinon.stub(carModel, 'update').onCall(0).resolves(carMockWithId).onCall(1).resolves(null);
    sinon.stub(carModel, 'delete').onCall(0).resolves(carMockWithId).onCall(1).resolves(null);
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

  describe('ReadOne Car', () => {
		it('Success', async () => {
			const carById = await carService.readOne(carMockWithId._id);
			expect(carById).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let error;
			try {
				await carService.readOne(carMockWithId._id);
			} catch (err:any) {
        error = err
			}
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('List Cars', () => {
		it('Success', async () => {
			const carsList = await carService.read();
			expect(carsList).to.be.deep.equal([carMockWithId]);
		});
	});

  describe('Update Car', () => {
		it('Success', async () => {
			const carUpdating = await carService.update('62cf1fc6498565d94eba52cd', carMock);
			expect(carUpdating).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let error;
			try {
				await carService.update('XABLAU', carMock);
			} catch (err:any) {
        error = err
			}
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Delete Car', () => {
		it('Success', async () => {
			const carDeleting = await carService.delete('62cf1fc6498565d94eba52cd');
			expect(carDeleting).to.be.deep.equal(carMockWithId);;
		});

		it('Failure', async () => {
      let error;
			try {
				await carService.delete('XABLAU');
			} catch (err:any) {
        error = err
			}
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
});