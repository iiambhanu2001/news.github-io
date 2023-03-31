const sportsbtn=document.getElementById("sports");
const homebtn=document.getElementById("home");
const entertainmentbtn=document.getElementById("entertainment");
const techbtn=document.getElementById("tech");
const serachbtn=document.getElementById("find")
const input=document.getElementById("INPUT")
const newstype=document.querySelector(".news");
let newsdetail=document.querySelector(".newsdetail")


var newsDataArr = [];
// <!-- NEW API-->

const APIKEY ="fb9e7efac8d04e38947ba14bf1132591";
const HEADLINES_NEWS ="https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const SPORTS_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS ="https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newstype.innerHTML="<h4>Headlines</h4>"
    fetchHeadlines();
};

homebtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>General news</h4>"
   fetchGeneralNews();
});
entertainmentbtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Entertainment</h4>"
    fetchenter();
});
techbtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Technology</h4>"
    fetchtechn();
});
sportsbtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Sports</h4>"
    fetchsport();
});
serachbtn.addEventListener("click", function(){
    newstype.innerHTML="<h4>Search: "+input.value+"</h4>";
   fetchallnews();
});


const fetchHeadlines = async ()=> {
    const response = await fetch(GENERAL_NEWS+APIKEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300){
        const myjson=await response.json();
        newsDataArr=myjson.articles;    
    }
    else {
    alert(response.status,response.statusText);
    newsdetail.innerHTML = "<h5>No data found.</h5>"
    return;
    }
displaynews();

}

const fetchGeneralNews =async()=>{
    const response=await fetch(GENERAL_NEWS+APIKEY);
    newsDataArr=[];
    if(response.status>=200 && response.status<300){
        const myjson=await response.json();
        newsDataArr=myjson.articles;    
    }
    else {
    alert(response.status,response.statusText);
    newsdetail.innerHTML = "<h5>No data found.</h5>"
    return;
    }
    displaynews();

}

const fetchsport = async ()=>{
    const response=await fetch(SPORTS_NEWS+APIKEY);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
     const myjson=await response.json(); 
     newsDataArr=myjson.articles;
     
    }
    else {
    alert(response.status,response.statusText);
    newsdetails.innerHTML = "<h5>No data found.</h5>"
    return;
    }
    
    displaynews();
}
const fetchenter = async ()=>{
    const response=await fetch(ENTERTAINMENT_NEWS+APIKEY);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
     const myjson=await response.json(); 
     newsDataArr=myjson.articles;
    }
    else 
    {
        alert(response.status,response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
        
    displaynews();
}
const fetchtechn = async ()=>{
    const response=await fetch(TECHNOLOGY_NEWS+APIKEY);
    newsDataArr=[];
    if(response.status >=200 && response.status<300){
        const myjson=await response.json(); 
     newsDataArr=myjson.articles;
     console.log(myjson);
    }
    else 
    {
        alert(response.status,response.statusText);
        newsdetail.innerHTML = "<h5>No data found.</h5>"
        return;
    }
        

    displaynews();
}
const fetchallnews=async()=>{
    if(input.value==null)
        return;
    
const response=await fetch(SEARCH_NEWS+encodeURIComponent(input.value)+"&apikey="+APIKEY);
newsDataArr=[];
if(response.status >=200 && response.status<300){
    const myjson=await response.json();
    console.log(myjson);
    newsDataArr=myjson.articles;

   }
   else
    {
    alert(response.status,response.statusText);
    newsdetail.innerHTML = "<h5>No data found.</h5>"
    return;
    }
    
   displaynews();
}

function displaynews(){
    newsdetail.innerHTML="";
        // if(newsDataArr.length==0){
        // newsdetail.innerHTML="<h5>Sorry!NO NEWS FOUND</h5>";
        // return;}
      
       newsDataArr.forEach(news => {
        var date=news.publishedAt.split("T");

        var col=document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";
        
        var card=document.createElement('div');
        card.className="p-2";

        var image=document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

         var cardbody=document.createElement('div');

         var newsheading=document.createElement('h5');
         newsheading.className="card-title";
         newsheading.innerHTML= news.title;
         
         var dateheading=document.createElement('h6');
         dateheading.className = "text-primary"
         dateheading.innerHTML = date[0];

         var description=document.createElement('p');
         description.className="text-muted";
         description.innerHTML=news.description;
 
         var link =document.createElement('a');
         link.className="btn btn-dark";
         link.setAttribute("target","_blank");
         link.href=news.url;
         link.innerHTML="Read More"

         cardbody.appendChild(newsheading);
         cardbody.appendChild(dateheading);
         cardbody.appendChild(description);
         cardbody.appendChild(link);

         card.appendChild(image);
         card.appendChild(cardbody);

         col.appendChild(card);

         newsdetail.appendChild(col);
       })

    }