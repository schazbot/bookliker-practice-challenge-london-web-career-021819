// document.addEventListener("DOMContentLoaded", function() {});
const LIST_PANEL = document.getElementById("list");
const BOOKS_URL = "http://localhost:3000/books";
const SHOW_PANEL = document.getElementById("show-panel");
const BOOK_BTN = document.getElementById("read-btn");
const USER_ONE = {
  id: 1,
  username: "pouros"
};

//API stuff
function getAllBooks() {
  return fetch(BOOKS_URL).then(resp => resp.json());
}

function updateBook(book) {
  return fetch(BOOKS_URL + `/${book.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  }).then(resp => resp.json());
}

//DOM stuff - list
function renderList(books) {
  books.forEach(renderTitle);
}
function renderTitle(book) {
  const titleEl = document.createElement("li");
  titleEl.className = "title";
  titleEl.id = `title-${book.id}`;
  titleEl.innerHTML = `
    <h1>${book.title}</h1>
    `;
  titleEl.addEventListener("click", () => showBook(book));
  LIST_PANEL.appendChild(titleEl);
}
// init
getAllBooks().then(renderList);

//DOM =show the book on show panel

function showBook(book) {
  SHOW_PANEL.innerHTML = `
    <h5>${book.title}</h5>
    <img src = "${book.img_url}" class="book-image"/>
    <p class= "description">${book.description}</p>
    <button class="button is-primary" id="read-btn" type="button">Read Book</button>
    <ul id="users-list" >${book.users
      .map(user => `<li id="user-${user.id}">${user.username}</li>`)
      .join(" ")}</ul>
    `;
  document
    .getElementById("read-btn")
    .addEventListener("click", () => {
        if (userNotReadBook(book)){
            updateReaders(book);
        }
    }
    )}

function updateReaders(book) {
  const readers = document.getElementById("users-list");
  const readerLi = document.createElement("li");
  readerLi.id = `user-${USER_ONE.id}`;
  readerLi.innerHTML = USER_ONE.username;
  readers.append(readerLi);
  book.users.push(USER_ONE);
  updateBook(book);
  document.getElementById("read-btn").innerText = "Unread"
}

function userNotReadBook(book){
    const foundUser = book.users.find(bookUser => bookUser.id === USER_ONE.id)
    return foundUser === undefined
}