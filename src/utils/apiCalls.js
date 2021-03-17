import { wordTrackerAPI } from "../apis/dict";
import _ from "lodash";
import jp from "jsonpath";

export const _putUser = async (user, gResponse) => {
  var resp = "No new books to add";
  var localBooks = user.books;
  localBooks =
    localBooks.length === 1
      ? localBooks.filter((obj) => Object.keys(obj).length)
      : localBooks;
  const googleBooks = gResponse.data.items;
  // var lcbooks = jmesPath.search({ user }, "user.books[*].name");
  var lcbooks = jp.query(user, "$.books[*].name");
  if (localBooks.length !== googleBooks.length || _.isEqual(lcbooks, [])) {
    googleBooks.forEach((book) => {
      if (!lcbooks.includes(book.volumeInfo.title)) {
        localBooks.push({
          id: book.volumeInfo.id,
          isbn_13: book.volumeInfo.industryIdentifiers[1].identifier,
          name: book.volumeInfo.title,
          words: [],
        });
      }
    });
    resp = await wordTrackerAPI.put(`/users/${user.id}`, {
      ...user,
      books: localBooks,
    });
    return resp;
  }

  return resp;
};

export const _postUser = async (userProp) => {
  const resp = await wordTrackerAPI.post("/users", {
    id: userProp.uid,
    name: userProp.name,
    email: userProp.email,
    books: [{}],
  });
  return resp;
};
