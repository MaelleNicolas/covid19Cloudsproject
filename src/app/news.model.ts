import { User } from "./user.model";

export class News {
    Date : string ;
    description : string;
    user : User ;
    country : string ; 
    title : string ;
    code : string ;

    constructor (Date : string ,
        description : string,
        user : User , country : string , title : string , code : string) {
            this.Date = Date;
            this.description= description;
            this.user= user ;
            this.country=country ;
            this.title = title ;
            this.code = title ;

        }
}