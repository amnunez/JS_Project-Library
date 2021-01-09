const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) =>
    accA.name.last > accB.name.last ? 1 : -1
  );
}

function numberOfBorrows(account, books) {
  let count = 0;
  books.forEach((book) =>
    book.borrows.map((borrow) => {
      if (borrow.id == account.id) {
        count += 1;
      }
    })
  );
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const inPossesion = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        if (author.id === book.authorId) book["author"] = author;
      });
      if (borrow.returned === false && borrow.id === account.id) {
        inPossesion.push(book);
      }
    });
  });
  console.log(inPossesion);
  return inPossesion;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
