import * as mongoose from 'mongoose';

export const WordSchema = new mongoose.Schema({
  eng: String,
  rus: String,
  user: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});