const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;
const mongoose = require('mongoose');

const Board = require('../src/models/Board');
const { createUser, login, createBoard, getBoardById, patchBoardById, deleteBoardById } = require('./utils/util');

const FakeBoardId = mongoose.Types.ObjectId();

describe('Board Controller Tests', () => {
  // CREATE
  it('should CreateBoard: has user', async () => {
    const createUserRes = await createUser('boardUser1', 'boardUser1', 'boardUser1');

    const loginRes = await login('boardUser1', 'boardUser1');

    const createBoardRes = await createBoard('Board Name 1', loginRes.body.token);

    expect(createBoardRes.status).to.eq(200);
    expect(createBoardRes.body.name).to.eq('Board Name 1');
    expect(createBoardRes.body.user).to.eq(createUserRes.body._id);
  });

  // GET
  it('should not GetBoardById: board dne', async () => {
    const getBoardByIdRes = await getBoardById(FakeBoardId);

    expect(getBoardByIdRes.status).to.eq(404);
  });

  it('should GetBoardById', async () => {
    const board = await Board.findOne({ name: 'Board Name 1' });

    const getBoardByIdRes = await getBoardById(board._id);

    expect(getBoardByIdRes.status).to.eq(200);
    expect(getBoardByIdRes.body.user).to.eq(board.user.toString());
  });

  // PATCH
  it('should not PatchBoardById: board dne', async () => {
    const loginRes = await login('boardUser1', 'boardUser1');

    const patchBoardByIdRes = await patchBoardById(FakeBoardId, loginRes.body.token, 'Board Name 1 Patch');

    expect(patchBoardByIdRes.status).to.eq(404);
  });

  it('should PatchBoardById', async () => {
    const loginRes = await login('boardUser1', 'boardUser1');

    const board = await Board.findOne({ name: 'Board Name 1' });

    const patchBoardByIdRes = await patchBoardById(board._id, loginRes.body.token, 'Board Name 1 Patch');

    expect(patchBoardByIdRes.status).to.eq(200);
  });

  // DELETE
  it('should not DeleteBoardById: board dne', async () => {
    const loginRes = await login('boardUser1', 'boardUser1');

    const deleteBoardByIdRes = await deleteBoardById(FakeBoardId, loginRes.body.token);

    expect(deleteBoardByIdRes.status).to.eq(404);
  });

  it('should not DeleteBoardById: board doesnt belong to logged in user', async () => {
    const createUserRes = await createUser('boardUser2', 'boardUser2', 'boardUser2');

    const loginRes = await login('boardUser2', 'boardUser2');

    const createBoardRes = await createBoard('Board Name 2', loginRes.body.token);

    const board = await Board.findOne({ name: 'Board Name 1 Patch' });

    const deleteBoardByIdRes = await deleteBoardById(board._id, loginRes.body.token);

    expect(deleteBoardByIdRes.status).to.eq(401);
  });

  it('should DeleteBoardById', async () => {
    const loginRes = await login('boardUser1', 'boardUser1');

    const board = await Board.findOne({ name: 'Board Name 1 Patch' });

    const deleteBoardByIdRes = await deleteBoardById(board._id, loginRes.body.token);

    expect(deleteBoardByIdRes.status).to.eq(200);
  });
});