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
                                    <div class="card-footer">
                                          <h4 class="fw-bold">${item.name} </h4>
                                    </div>
                        </div>
                  </div>
            `

            itemsContainer.appendChild(div);
            loadFeatures(item.features, item.id);
      }
      

}

const loadFeatures = (features, id) => {
      

      const featuresContainer = document.getElementById(id);

      features.forEach(feature => {
            featuresContainer.innerHTML += `
            
            <li>${feature ? feature : 'No Data Found'} </li>
            `
      })



}



