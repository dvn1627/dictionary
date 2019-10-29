import * as mongoose from 'mongoose';

export const WordSchema = new mongoose.Schema({
  eng: String,
  rus: String,
  showed: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  wrong: { type: Number, default: 0 },
  user: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});