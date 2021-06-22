let myLeads=[];
const inputBtn= document.querySelector('.input-btn');
const inputEl= document.querySelector("#inputEl")
const ulEl=document.querySelector("#ul-El");
const deleteBtn = document.querySelector(".del-btn")
const tabBtn = document.querySelector(".tab-btn")

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
       chrome.tabs.query({active: true , currentWindow: true} , function(tabs) {

             myLeads.push(tabs[0].url)
             localStorage.setItem("myLeads", JSON.stringify(myLeads))
             render(myLeads)
       })
       
})


function render(leads) {
    let listItems=[];

    for(let i=0; i< leads.length; i++) {
       listItems += 
                `<li>
                    <a target= '_blank' href='${leads[i]}'> 
                    ${leads[i]}
                    </a>
                </li>`;
    }

     ulEl.innerHTML =listItems;
}


deleteBtn.addEventListener("dblclick" , function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
})


