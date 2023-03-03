// load card 
const loadData = async (itemNumber) => {
      const url = `https://openapi.programming-hero.com/api/ai/tools`;
      const res = await fetch(url);
      const data = await res.json();
      displayData(data.data.tools, itemNumber);
}


 //button see more
 document.getElementById('btn-see-more').addEventListener('click',function(){
      const itemsContainer = document.getElementById('items-container');
      itemsContainer.innerHTML=''
      loadData();
 })


// load item details 
const loadDetails= async(id)=>{
      const url=` https://openapi.programming-hero.com/api/ai/tool/${id}`;
      const res= await fetch(url);
      const data= await res.json();
      displayDetails(data.data);
}