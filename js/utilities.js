//display all data
const displayData = (items, itemNumber) => {
      dataLoader(true);

      items = items.slice(0, itemNumber);
      const btnSeeMore = document.getElementById('btn-see-more');
      if (items.length === 6) {
            btnSeeMore.classList.remove('d-none');
      }
      else if (items.length > 6) {
            btnSeeMore.classList.add('d-none');
      }
      
      
//  sort by date 
      document.getElementById('sort-by-date').addEventListener('click', function () {
            const newArray=items.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
            displayData(newArray);

      })
      const itemsContainer = document.getElementById('items-container');
      itemsContainer.innerHTML='';
      items.forEach(item => {
            const div = document.createElement('div');
            // console.log(item.description?item.description:`${item.name } helps in our many sectors. Today it is useful for us`);
            div.innerHTML = `
                        

                  <div class="col card-hover">
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
                                                <button onclick="loadDetails('${item.id}')" class="rounded-circle border-0 p-3 text-danger bg-danger-subtle details" data-bs-toggle="modal" data-bs-target="#itemDetails"><i class="fa-solid fa-arrow-right"></i></button>
                                          </div>
                                    </div>
                        </div>
                  </div>

                  
            `




            itemsContainer.appendChild(div);

            // load features 
            loadFeatures(item.features, item.id);
      });


      dataLoader(false);

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

// data loader
const loaderSection = document.getElementById('loader');
const dataLoader = isLoading => {
      if (isLoading) {
            loaderSection.classList.remove('d-none');
      }
      else {
            loaderSection.classList.add('d-none');
      }
}


//display details
const displayDetails = data => {
      dataLoader(true);
      document.getElementById('description').innerText = data.description ? data.description : 'No description';

      const image = document.getElementById('image');
      image.innerHTML = '';
      const pic = document.createElement('div');
      pic.innerHTML = `
      <img src="${data.image_link[0]}" class="img-fluid rounded-3" alt="">
      <div id="accuracy" class="d-none position-absolute top-0 end-0 mt-3 me-4 color-primary border-0 py-1 text-white fw-semibold px-3 rounded" ><span class="px-2"> ${data.accuracy.score * 100}%</span>accuracy</div>
      `
      image.appendChild(pic);

      const accuracy = document.getElementById('accuracy');
      
      //      acuuracy set 
      if (data.accuracy.score * 100 === 0) {
            accuracy.classList.add('d-none');
      }
      else {
            accuracy.classList.remove('d-none');
      }

      // pricing set 
      const pricingContainer = document.getElementById('pricing');
      pricingContainer.innerHTML = '';

      data.pricing ? data.pricing.forEach(p => {
            pricingContainer.innerHTML += `
            <div class=" bg-white p-3 rounded-3 ">
               <p> ${p.price != '0' ? p.price : "Free of Cost/"}</p>
                <h5 class="fw-semibold "> ${p.plan}</h5>
                
             </div>
            `
      }) : pricingContainer.innerHTML += `
            <div class=" bg-white p-3 rounded-3 text-danger text-center">
            <h4 class="">Free OF Cost </h4>  
            </div>
            `;

      // fature items add in modal 
      const faturesItemContainer = document.getElementById('fatures-item');
      faturesItemContainer.innerHTML = '';

      for (const key in data.features) {
            faturesItemContainer.innerHTML += `
            <li> ${data.features ? data.features[key].feature_name : 'No features Found'} </li >
            `

      }

      // integration secton 
      const integeationContainer = document.getElementById('integration-section');
      integeationContainer.innerHTML = '';
      data.integrations ? data.integrations.forEach(item => {
            integeationContainer.innerHTML += `
            <li>${item} </li>
             `;

      }) : integeationContainer.innerHTML += `
      <h5 class="text-danger">No data Found </h5>
       `;


      //  qustion add 
      const questionSection = document.getElementById('question-section');
      questionSection.innerHTML = `
            <h4 class="fw-semibold mt-4 text-center">${data.input_output_examples ? data.input_output_examples[0].input : 'Can You give me any example ?'} </h4>
            <p class="mt-4 text-center">${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
      `


      dataLoader(false);


}
