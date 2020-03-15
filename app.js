// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){}


// Add book
UI.prototype.addBook = function(book){
    // Book list
    const list = document.getElementById('book-list');
    // Create element
    const row = document.createElement('tr');
    // insert
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td <a href="#" class="delete">🗑</a></td>
    `
    list.appendChild(row);

}

// Clear Field
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert
UI.prototype.showSwal = function(icon, title, text){
    Swal.fire({
        icon: `${icon}`,
        title: `${title}`,
        text: `${text}`,
      })
}

UI.prototype.showAlert = function(message, className){
    // Create div
    const div = document.createElement('div');
    // Add Clas
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book');
    // insert
    container.insertBefore(div, form);

    setTimeout( function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
         
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#00a8ff',
    cancelButtonColor: '#e84118',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Book has been deleted.',
        'success'
      )
      target.parentElement.parentElement.remove();
    }
  })
        
    }
}

// Event Listener Add Book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Form value
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Swal
        ui.showSwal('warning', 'Oops..', 'Please fill in all fields');

    } else{

            // Add book
          ui.addBook(book);
            // clear field
          ui.clearField();
            // Show alert
          ui.showAlert('Book Added!', 'alert-success');

    }



    e.preventDefault();
});

// Event listener Delete
document.getElementById('book-list').addEventListener('click', function(e){
    
    const ui = new UI();

    ui.deleteBook(e.target);

    e.preventDefault();
});