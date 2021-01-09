function totalBooksCount(books) {
  return books.reduce((acc, book) => (acc += 1), 0);
}

function totalAccountsCount(accounts) {
  return accounts.reduce((acc, account) => (acc += 1), 0);
}

function booksBorrowedCount(books) {
  let count = 0;
  books.map((book) => {
    book.borrows.map((borrow) => {
      if (borrow.returned === false) {
        count += 1;
      }
    });
  });
  return count;
}

function getMostCommonGenres(books) {
  let mostCommonGenres = [];
  const genresArray = books.map((book) => book.genre);
  const genreCount = genresArray.reduce((acc, genre) => {
    acc[genre] === undefined ? (acc[genre] = 1) : (acc[genre] += 1);
    return acc;
  }, {});
  for (let genre in genreCount) {
    const count = genreCount[genre];
    mostCommonGenres.push({ name: genre, count: count });
  }
  let fiveMostCommon = mostCommonGenres
    .sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1))
    .slice(0, 5);
  return fiveMostCommon;
}

function getMostPopularBooks(books) {
  const bookCount = books.map((book) => {
    const { title, borrows } = book;
    return { name: title, count: borrows.length };
  });
  const sortedCount = bookCount.sort(
    (bookA, bookB) => bookB.count - bookA.count
  );
  return sortedCount.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const booksByAuthorAndBorrows = books.map((book) => {
    const { authorId, borrows } = book;
    return { name: authorId, count: borrows.length };
  });

  const authorName = authors.map((author) =>
    booksByAuthorAndBorrows.find((item) => {
      if (item.name === author.id) {
        item.name = `${author.name.first} ${author.name.last}`;
        return author;
      }
    })
  );

  const mostPopularAuthors = authorName.sort(
    (authorA, authorB) => authorB.count - authorA.count
  );

  return mostPopularAuthors.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
