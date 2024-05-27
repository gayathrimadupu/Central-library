using my.bookshop as my from '../db/data-model';
@path : '/BookSRV'

service CatalogService {
     entity Books as projection on my.Books;
     entity Admins as projection on my.Admins;
     entity Users as projection on my.Users;
     entity Activeloans as projection on my.Activeloans;
}
