namespace my.bookshop;
using {cuid} from '@sap/cds/common';

entity Books : cuid {
   ISBN          : String;
      title        : String;
      author       : String;
      quantity     : Integer;
      genre        : String;
      availability : String;
      barcode      : String;
      status : String;
      // Users : Composition of many Users on Users.Books=$self;
      activeloans:Association to  many Activeloans on activeloans.bookId=$self;
}

entity Users {
  key ID            : UUID;
      username      : String;
      password      : String;
      email         : String;
      Borrowedbooks : Integer;
      Returndates   : Date;
      Notifications : Integer;
      // activeloans:Association to Activeloans;
      usertype : String;
      Bookloans : Association to Activeloans on Bookloans.userId =$self;
      
}
entity Activeloans :cuid{ 
  issueDate : Date;
  dueDate   : Date;
  bookId    : Association to Books;
  userId    : Association to Users
 }

 entity Reservations : cuid {
  ReserverdUserName : String;
  ReserverdUserId: String;
  ReserverdBook: String;

}

