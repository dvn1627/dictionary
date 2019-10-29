import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
  name: String,
});