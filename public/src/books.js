function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksBorrowed = [];
  let booksReturned = [];
  books.forEach((book) =>
    book.borrows.forEach((borrow) => {
      borrow.returned === false
        ? booksBorrowed.push(book)
        : booksReturned.push(book);
    })
  );
  return [booksReturned, booksBorrowed];
}

function getBorrowersForBook(book, accounts) {
  let borrowActivity = [];
  accounts.map((account) => {
    book.borrows.find((borrow) => {
      if (borrow.id == account.id) {
        account["returned"] = borrow.returned;
        borrowActivity.push(account);
      }
    });
  });
  return borrowActivity.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
