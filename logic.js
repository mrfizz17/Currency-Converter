import {countryList} from './data.js';

const  init = ()=> {


    countryList.forEach((country)=>{
        
        const li1 = document.createElement("option");
        li1.value = country.code;
        li1.textContent = country.code;

        const li2 = document.createElement("option");
        li2.value = country.code;
        li2.textContent = country.code;


        let fromParent =document.querySelector("#from");
        let toParent = document.querySelector("#to");
        

        if(country.code === "US"){
            li1.selected = true;
        }else if(country.code === "BD"){
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

       
    });














}
init();

function renderFlags(event){

    let src ;

    

    const selectedElem = event.target;
    const selectedValue = selectedElem.value;

    src=`https://flagsapi.com/${selectedValue}/flat/64.png`

    
    

    if(selectedElem.id === "from"){
        document.querySelector(".from-img").src = src;
    }else if(selectedElem.id === "to"){
        document.querySelector(".to-img").src = src;
    }

  


}
async function convert(){
        const from = document.querySelector("#from").value;
        const to = document.querySelector("#to").value;
       

        

        let fromCur;
        let toCur;

        countryList.forEach((item)=>{
            if(item.code===from){
                fromCur = item.currency;
               
            } if(item.code===to){
                toCur = item.currency;
                
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

        

        const url =
                `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCur}.json`;

            const res = await fetch(url);
            const data = await res.json();
            const result = data[fromCur][toCur]*amntval;

       

        document.querySelector(".show-msg").textContent = `${amntval} ${fromCur} = ${result.toFixed(2)} ${toCur}`;
        document.querySelector("#amount").value = "";

}

