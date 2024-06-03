using my.bookshop as my from '../db/data-model';
@path : '/BookSRV'

service CatalogService {
     entity Books as projection on my.Books;
     entity Users as projection on my.Users;
     entity Activeloans as projection on my.Activeloans;
     entity Reservations as projection on my.Reservations;
}
