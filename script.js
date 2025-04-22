// Library Array
const myLibrary = [
    {
        id: 1,
        imageUrl: "https://i.imgur.com/2z4K95I.jpeg",
        title: "Hamlet",
        author: "William Shakespeare",
        pages: 317,
        read: false,        
    },
    {
        id: 2,
        imageUrl: "https://i.imgur.com/wW70vfm.jpeg",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 151,
        read: true,        
    }
];

// Book contructor
function Book(imageUrl, title, author, pages, read) {
    if (!new.target) {
        throw Error("Function book must be called with new keyword!");
    }

    this.id = crypto.randomUUID();
    this.imageUrl = imageUrl;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = false;
}

// Function for adding books to library array
function addBookToLibrary(imageUrl, title, author, pages, read) {
    const newBook = new Book(imageUrl, title, author, pages, read);
    myLibrary.push(newBook);
}

// Function for displaying books on page
function displayBooks() {

    // Loops through library array one book at a time
    for (book of myLibrary) {
        // New book div
        const newBookDiv = document.createElement("div");
        newBookDiv.className = "book";

        // Book Cover image container
        const imageContainer = document.createElement("div");
        imageContainer.className = "cover";
        
        // Book information container
        const bookInfo = document.createElement("div");
        bookInfo.className = "book-info";


        // Loops through the book object adding each property to the correct container
        for (let property in book) {
            if (property != "displayed") {
                const prop = document.createElement("div");

                if (property == "read") {
                    if (book[property] == true) {
                        prop.innerText = `${property}: Yes`;

                    } else {
                        prop.innerText = `${property}: No`;
                    }

                } else {
                    prop.innerText = `${property}: ${book[property]}`;
                }
                
                if (property != "imageUrl"){
                    bookInfo.appendChild(prop);

                } else {
                    const cover = document.createElement("img");
                    cover.src = book[property];
                    cover.alt = `Cover image of ${book.title}`;
                    
                    imageContainer.appendChild(cover);
                }
            }
        }

        newBookDiv.appendChild(imageContainer);
        newBookDiv.appendChild(bookInfo);

        if (!book.displayed) {
            document.querySelector(".books").appendChild(newBookDiv);
            book.displayed = true;
        }
    }


}

displayBooks();

const addBtn = document.querySelector("#add");

addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.querySelector("input[placeholder='Title']").value;
    const author = document.querySelector("input[placeholder='Author']").value; 
    const imageUrl = document.querySelector("input[placeholder='Image Url']").value;
    const pages = document.querySelector("input[type='number']").value;
    const read = document.querySelector("input[type='checkbox']").checked;

    addBookToLibrary(imageUrl, title, author, pages, read);

    displayBooks();
})

