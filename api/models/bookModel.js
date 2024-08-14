const mongoose = require('mongoose')
const bookSchema = mongoose.Schema(
   {
      title: { type: String, required: true, unique: true },
      author: { type: String, required: true},
      genre: { type: String, required: true },
      description: { type: String, required: true },
      coverImageUrl: { type: String, default: 'https://online.visual-paradigm.com/repository/images/4783989f-5816-4cca-970b-e5223e3d2f19/book-covers-design/illustrated-fantasy-book-cover.png' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
   },
   {
      versionKey: false
   }
)
const bookModel = mongoose.model("books", bookSchema)
module.exports = bookModel