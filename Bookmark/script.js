const addBookmark = document.getElementById('add-bookmark');
const bookmarkContainer = document.querySelector('.bookmark-container');
const maskContainer = document.querySelector('.mask-container');
const inputBookmark = document.querySelector('.input-bookmark');
const webName = document.getElementById('web-name');
const webUrl = document.getElementById('web-url');
const closeInput = document.getElementById('close-input');
const form = document.getElementById('form');
const saveBtn = document.getElementById('save-btn');

let bookmarks = [];

//build bookmarks in screen
function buildBookmarks() {
    bookmarkContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        const newBookmark = document.createElement('div');
        newBookmark.classList.add('bookmark');

        const icon = document.createElement('img');
        icon.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`);
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        const bookmarkName = document.createElement('h2');
        bookmarkName.textContent = `${name}`;

        const closeBtn = document.createElement('i');
        closeBtn.classList.add('fas');
        closeBtn.classList.add('fa-times');
        closeBtn.setAttribute('title', 'Delete Bookmark');
        closeBtn.setAttribute('onclick', `deleteBookmark('${url}')`);

        link.appendChild(bookmarkName);
        newBookmark.append(icon, link, closeBtn);
        bookmarkContainer.appendChild(newBookmark);
    })
}

function fetchBookmarks() {
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    };
    buildBookmarks();
}

function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
          bookmarks.splice(i, 1);
        };
      });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}


// show or hide input
function showBookmarkForm() {
    maskContainer.classList.add('mask-show');
    webName.focus();
};

addBookmark.addEventListener('click', showBookmarkForm);
closeInput.addEventListener('click', ()=>{maskContainer.classList.remove('mask-show');})

// validation
function validateForm(nameValue, urlValue) {
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
    const regE = new RegExp(expression);

    if(!nameValue || ! urlValue) {
        alert('Please enter values for both fields.');
        return false;
    };
    if(!urlValue.match(regE)) {
        alert('Please provide a valid web address.');
        return false;
    };
    return true;
};

// store input
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = webName.value;
    let urlValue = webUrl.value;
    if(!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`;
    };
    if (!validateForm(nameValue, urlValue)) {
        return false;
    };

    const bookmark = {
        name: nameValue,
        url: urlValue
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
    form.reset();
    webName.focus();
}

form.addEventListener('submit', storeBookmark);

// on load
fetchBookmarks();
