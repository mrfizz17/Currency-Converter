


import {getData,getData2} from "./data.js";

// getData();
let countryList = [];
console.log("hello world");


 let fromParent;
 let toParent;

const  init = async ()=> {
    countryList= await getData();

    countryList.forEach((country)=>{
        
        const li1 = document.createElement("option");
        li1.value = country.Code;
        li1.textContent = country.Name;

        const li2 = document.createElement("option");
        li2.value = country.Code;
        li2.textContent = country.Name;


        fromParent =document.querySelector("#from");
        toParent = document.querySelector("#to");
        

        if(country.Code === "US"){
            li1.selected = true;
        }else if(country.Code === "BD"){
            li2.selected = true;
        }

        fromParent.appendChild(li1);
        toParent.appendChild(li2);

        
    }); 




    document.querySelectorAll("select").forEach((select)=>{
        select.addEventListener("change",(e)=>{
            renderFlags(e);
        })
    });


    document.querySelector('.convert-btn').addEventListener("click",()=>{
        convert();

        // document.querySelector(".show-msg").textContent = `${amntval} ${from} = ${result.toFixed(2)} ${to}`;  
    });














}
init();


function renderFlags(event){

    let src ;

    countryList.forEach((country)=>{
        if(country.Code === event.target.value){
            src = country.img;
        }   
    });

    const selectedElem = event.target;
    const selectedValue = selectedElem.value;

    console.log("Selected Value:", selectedValue);
    console.log("Selected Element:", src);
    

    if(selectedElem.id === "from"){
        document.querySelector(".from-img").src = src;
    }else if(selectedElem.id === "to"){
        document.querySelector(".to-img").src = src;
    }

  


}


async function convert(){
        const from = document.querySelector("#from").value;
        const to = document.querySelector("#to").value;
       

        let convertData = getData2();

        // console.log(convertData[88]['BD']);

        let fromCur;
        let toCur;

        convertData.forEach((item)=>{
            if(item[from]){
                fromCur = item[from];
                // console.log("FROM CURRENCY:", fromCur);
            } if(item[to]){
                toCur = item[to];
                // console.log("TO CURRENCY:", toCur);
            }
        });

         const amntval = Number(document.querySelector("#amount").value);
         console.log("AMOUNT VALUE:", amntval);

        if(amntval === "" || amntval <= 0){
            alert("Please enter a valid amount");
            return;
        }

        fromCur = fromCur.toLowerCase();
        toCur = toCur.toLowerCase();

        console.log("FROM CURRENCY:", fromCur);
        console.log("TO CURRENCY:", toCur);

        const url =
                `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCur}.json`;

            const res = await fetch(url);
            const data = await res.json();
            const result = data[fromCur][toCur]*amntval;

        console.log(data);
        console.log(result);

        document.querySelector(".show-msg").textContent = `${amntval} ${fromCur} = ${result.toFixed(2)} ${toCur}`;
        document.querySelector("#amount").value = "";

}

// // async function test() {
// //   const url =
// //     "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

// //   const res = await fetch(url);
// //   const data = await res.json();

// //   console.log("WORKING TEST:", data);
// // }

// // test();