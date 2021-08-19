const mongoose = require('mongoose');

const PaletteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  SubCategory: {
    type: String,
    required: true
  },
  SchemeName: {
    type: String,
    required: true
  },
  SchemeDescription: {
    type: String,
    required: true
  },
  Contrast: {
    type: String,
    required: true
  },
  MainColor: {
    type: String,
    required: true
  },
  Color1ID: {
    type: String,
    required: true
  },
  Color1ID: {
    type: String,
    required: true
  },
  Color2ID: {
    type: String,
    required: true
  },
  Color3ID: {
    type: String,
    required: true
  },
  Color4ID: {
    type: String,
    required: true
  },
  Color5ID: {
    type: String,
    required: true
  },
  Color6ID: {
    type: String,
    required: true
  },
  Color7ID: {
    type: String,
    required: true
  },
});

const Palette = mongoose.model('Palette', PaletteSchema);

module.exports = Palette;