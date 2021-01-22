//export interface CovidCountriesAll {
export class CovidCountriesAll {
    Country: string;
    CountryCode : string;
    Date : string;
    NewConfirmed: number;
    NewDeaths : number;
    NewRecovered: number;
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths : number;
    TotalRecovered: number;
    
    constructor (Country : string , 
        CountryCode : string,
        Date : string,
        NewConfirmed: number,
        NewDeaths : number,
        NewRecovered: number,
        Slug: string,
        TotalConfirmed: number,
        TotalDeaths : number, 
        TotalRecovered: number,
        ){
            this.Country=Country ;
            this.CountryCode=CountryCode;
            this.Date=Date;
            this.NewConfirmed=NewConfirmed
            this.NewDeaths=NewDeaths;
            this.NewRecovered=NewRecovered;
            this.Slug=Slug;
            this.TotalConfirmed=TotalConfirmed,
            this.TotalDeaths=TotalDeaths;
            this.TotalRecovered=TotalRecovered;
            
        }

    

}
/** 
export class CovidCountriesAll {
    date : Date ;
    description : string;
    amount : number ;

    constructor (date : Date ,
        description : string,
        amount : number ) {
            this .date = date;
            this.description= description;
            this.amount= amount ;
        }
}

*/

/**Slug: string,
    NewConfirmed: number,
    TotalConfirmed: number,
    NewDeaths : number,
    TotalDeaths : number,
    NewRecovered: number,
    TotalRecovered: number,
    Date : string, */