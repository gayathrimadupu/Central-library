namespace my.bookshop;

entity Books  {
  key ISBN          : String;
      title        : String;
      author       : String;
      quantity     : Integer;
      genre        : String;
      availability : String;
      barcode      : String;
      Users : Association to many Users;
}

entity Users {
  key ID            : String;
      username      : String;
      password      : String;
      email         : String;
      Borrowedbooks : Integer;
      Returndates   : Date;
      Notifications : Integer;
}

entity Admins {
  key ID           : Integer;
      username     : String;
      password     : String;
      total_books  : Integer;
      active_loans : Integer;

}

entity Activeloans
 {
  bookId    : Association to Books;
  userId    : Association to Users;
  issueDate : Date;
  dueDate   : Date
 }

// entity Loans {
//   key ID         : Integer;
//       userID     : Integer;
//       // Reference to Users entity
//       bookID     : Integer;
//       // Reference to Books entity
//       loanDate   : DateTime;
//       returnDate : DateTime;
// }

// entity Genres {
//   key ID          : Integer;
//       name        : String;
//       description : String;
// }

// entity Library {
//     key ID : Integer;
//     name : String;
//     books : composition of many Books; // Composition to represent a library having multiple books
// }
