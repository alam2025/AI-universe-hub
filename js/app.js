const loadData = async () => {
      const url = `https://openapi.programming-hero.com/api/ai/tools`;
      const res = await fetch(url);
      const data = await res.json();
      displayData(data.data.tools);
}

//display all data
const displayData = items => {
      // console.log(items);
      const itemsContainer = document.getElementById('items-container');
      // console.log(items);

      for (const item of items) {
            // console.log(item);
            const div = document.createElement('div');

            div.innerHTML = `
                        

                        <div class="col">
                        <div class="card h-100">
                              <img src=${item.image} class="card-img-top p-2 card-img" alt="...">
                                    <div class="card-body">
                                          <h5 class="card-title fw-semibold">Features</h5>
                                          <ol id="${item.id}"> </ol>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between align-items-center py-4">
                                          <div>
                                                <h4 class="fw-bold">${item.name} </h4>
                                                <div class="d-flex gap-2 align-items-center"><i class="fa-regular fa-calendar-days"></i>${item.published_in}</div>
                                          </div>
                                          <div>
                                                <button class="rounded-circle border-0 p-3 text-danger bg-danger-subtle"><i class="fa-solid fa-arrow-right"></i></button>
                                          </div>
                                    </div>
                        </div>
                  </div>
            `

            itemsContainer.appendChild(div);

            // load features 
            loadFeatures(item.features, item.id);
      }
      

}

// load features 
const loadFeatures = (features, id) => {
      

      const featuresContainer = document.getElementById(id);

      features.forEach(feature => {
            featuresContainer.innerHTML += `
            
            <li>${feature ? feature : 'No Data Found'} </li>
            `
      })



}



