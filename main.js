// Get variable names
let search_input = document.getElementById('search_color');
let colors_list = document.getElementById('colors_list');
let loading_animation = document.getElementById('loading');

// Fetch data from API
async function fetchColors(){
  loading_animation.style.display = "flex";
  const response = await fetch("https://api.sampleapis.com/csscolornames/colors");
  loading_animation.style.display = "none";
  return await response.json();
}

// Show on loading
showRandomColors(20);

// Show on typing search input
const debounce = (fn, delay)=>{
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn();
        }, delay)
    }
}

search_input.addEventListener("keyup", debounce(()=>{
    if(search_input.value.length>2){
      showSelectedColors(search_input.value);
    }
    if(search_input.value.length===0){
      showRandomColors(20);
    }
}, 600));


// general functions rendering data
function getRandomArrayFromData(data, count){
  let random_array=[];
  while(random_array.length<count){
    random_array.push(data[Math.floor(Math.random() * data.length-1)]);
  }
  return random_array;
}

function showRandomColors(count){
  colors_list.innerHTML='';
  fetchColors()
    .then(data=>{
      getRandomArrayFromData(data, count).forEach(element => {
        colors_list.innerHTML+=`<div class="col">
                          <div class="card h-100 border-0 p-0 shadow" style="background-color:${element.hex}">
                            <div class="card-body rounded-top" style="max-height: 100px; background-color:${element.hex}">
                              <div class="fs-5"></div>
                              <small class="text-muted"></small>
                            </div>
                            <div class="card-footer" style="background-color:white; height:inherit">
                              <div class="fs-5">${element.name}</div>
                              <div class="text-muted">${element.hex}</div>
                            </div>
                          </div>
                        </div>`;
      });
    })
    .catch(err=>console.log(err));
}


function getFilteredArrayFromData(data, input_value){
    return data.filter(val=>{
            if(val.name.includes(input_value)){
              return val;
            }
          });
    // let color_names_arr=data.map(val=>val.name);
    // let filtered_arr = color_names_arr.filter((str)=>str.indexOf(input_value) === 0);
    // let filtered_arr = color_names_arr.filter(str=>str.includes(input_value));
}

function showSelectedColors(input_value){
  colors_list.innerHTML='';
  fetchColors()
    .then(data=>{
      getFilteredArrayFromData(data, input_value).forEach(element => {
        colors_list.innerHTML+=`<div class="col">
                          <div class="card h-100 border-0 p-0 shadow" style="background-color:${element.hex}">
                            <div class="card-body rounded-top" style="background-color:${element.hex}">
                              <div class="fs-5"></div>
                              <small class="text-muted"></small>
                            </div>
                            <div class="card-footer" style="background-color:white; height:inherit">
                              <div class="fs-5">${element.name}</div>
                              <div class="text-muted">${element.hex}</div>
                            </div>
                          </div>
                        </div>`;
      });
    })
    .catch(err=>console.log(err));
}




