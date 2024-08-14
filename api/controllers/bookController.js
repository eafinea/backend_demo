const bookModel = require('../models/bookModel');
const fs = require('fs');
const path = require('path');

const view_all_books = async (req, res) => {
   try {
      books = await bookModel.find({})
      res.json(books)
   } catch (err) {
      res.send(err)
   }
}

const add_new_book = async (req, res) => {
   try {
      await bookModel.create(req.body)
      res.json({ "message": "New book successfully added", "book": req.body })
   } catch (err) {
      res.send(err)
   }
}

const view_a_book = async (req, res) => {
   try {
      book = await bookModel.findById(req.params.id)
      res.json(book)
   } catch (err) {
      res.send(err)
   }
}

const update_book = async (req, res) => {
   try {
      book = await bookModel.findByIdAndUpdate(req.params.id, req.body)
      res.json({ "message": "Book successfully updated" })
   } catch (err) {
      res.send(err)
   }
}

const delete_a_book = async (req, res) => {
   try {
      const book = await bookModel.findById(req.params.id);

      if (book) {
         // Remove the base URL to get the relative path
         const relativeImagePath = book.coverImageUrl.replace('http://localhost:3001', '');
         const imagePath = path.join(__dirname, '../..', relativeImagePath);

         // Log the image path and check if the file exists
         console.log('Deleting image at path:', imagePath);
         if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('Image deleted successfully');
         } else {
            console.log('Image not found at path:', imagePath);
         }

         // Delete the book entry from the database
         await bookModel.findByIdAndDelete(req.params.id);
         res.json({ "message": "Book and its cover image successfully deleted" });
      } else {
         res.status(404).json({ "message": "Book not found" });
      }
   } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).send(err);
   }
}


const delete_all_books = async (req, res) => {
   try {
      await bookModel.deleteMany({})
      res.json({ "message": "All books successfully deleted" })
   } catch (err) {
      res.send(err)
   }
}

module.exports = {
   view_all_books,
   add_new_book,
   view_a_book,
   update_book,
   delete_a_book,
   delete_all_books
}