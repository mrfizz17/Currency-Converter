const countryApi= `https://restcountries.com/v3.1/all?fields=cca2,cca3,currencies,flags,name`;



let countryCur=[];

    let usefulData = [];

export const getData= async ()=>{
   const response = await fetch(countryApi);
   let data = await response.json();

    

    data.forEach((country)=>{
       if (!country.currencies) return;
            usefulData.push({
                Code: country.cca2,
                Name:country.cca3,
                img: country.flags.png,
                currencies: Object.keys(country.currencies)[0]
            });
            countryCur.push(
                { [country.cca2]: Object.keys(country.currencies)[0] }
            );
        
    });

    // console.log(usefulData);
    // console.log(data);
    // console.log(countryCur);
    return usefulData;

}

export const getData2 = ()=>{
    // console.log(countryCur);

    return countryCur;
}
// getData2();






// getData();

// async function test() {
//   const url =
//     "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/bdt.json";

//   const res = await fetch(url);
//   const data = await res.json();

//   console.log("WORKING TEST:", data);
// }

// test();