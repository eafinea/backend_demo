const bookController = require('../controllers/bookController')
const bookRouter = (app) => {
   app.route('/books')
      .get(bookController.view_all_books)
      .post(bookController.add_new_book)
      .delete(bookController.delete_all_books)

   app.route('/books/:id')
      .get(bookController.view_a_book)
      .put(bookController.update_book)
      .delete(bookController.delete_a_book)
}
module.exports = bookRouter