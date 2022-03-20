// import {loadmore, queryBykeywor} from "./static/controller/controller.mjs"
// import {creatStore} from "./static/store/store.mjs"

//reducer for index pageupdate



async function pageUpdate(action){ 

    switch(action.type){
        case "loadMore":{
            let current_state = action.payload
            console.log(current_state)
            nextpage = await loadmore(current_state);
            if (nextpage){
                observer.observe(loadingObserver);
                current_state.nextPage = nextpage;
                current_state.nowPage = nextpage - 1;
                return current_state}
            else{
                current_state.nextPage = nextpage;
                return current_state
            }}
                
        case "keywordQuery":{
                let current_state = action.payload
                nextpage = await queryBykeywor(current_state);
                if (nextpage){
                    observer.observe(loadingObserver);
                    current_state.nextPage = nextpage;
                    return current_state
                }
                else{
                    current_state.nextPage = nextpage;
                    return current_state
            }
            
        }
    }
}

const init_STATE = {"nowPage":0,"nowKeyword": null, "nextPage":0}
const store = createStore(pageUpdate, init_STATE) //creatStore(reducer, state)
const loadingObserver = document.querySelector('.observer');
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
    };

// 利用callback去連結Dispatcher => 傳入動作到 reducer => 再進行STATE&VIEW的改變
const  callback = async ([entry]) => {
      // 當此圖片進入 viewport 時才載入圖片
      if (entry && entry.isIntersecting) { 
        // 載入圖片
        observer.unobserve(loadingObserver);
        store.dispatch({"type":"loadMore","payload":store.getState()})
     };
  }
let observer = new IntersectionObserver(callback, options);
observer.observe(loadingObserver);


// keyword query event Listener
const get_input_keyword_button = document.querySelector(".buttonKeywords");
get_input_keyword_button.addEventListener("click", (event)=>{keywordquery()})





<<<<<<< HEAD

function keywordquery(){
    observer.unobserve(loadingObserver);
    let get_input_keyword = document.querySelector(".inputKeywords");
    let currentState = store.getState();
    currentState["nowKeyword"] = get_input_keyword.value;
    currentState["nextPage"] = 0;
    store.dispatch({"type":"keywordQuery","payload":currentState})
    
}

function createStore(reducer, init_state) {
    let currentState = init_state;//狀態
    let currentListeners = [];//state監聽狀態變化
  
    function getState() {
      return currentState
    }
  
    function subscribe(listener) {
      //传入函数
      currentListeners.push(listener)//放入一個監聽
    }
  
    async function dispatch(action){
        currentState = await reducer(action)
 
    }

  
    return {getState,subscribe,dispatch}
  }



// index page controller
async function loadmore(state){ //state {"page:","keyword"}
    const attraction_data = await get_attractions(state["nextPage"], state["nowKeyword"]);
    await render_page(attraction_data);
    return attraction_data["nextPage"]
}


async function queryBykeywor(state){ //state {"page:","keyword"}
    const attraction_data = await get_attractions(state["nextPage"], state["nowKeyword"]);
    if (attraction_data["data"].length){
        await remove_block();
        await render_page(attraction_data); 
    }
    else{
        alert("keyword not found! pls try other keyword")
    }
    return attraction_data["nextPage"]
}

// fetch data for index page
async function get_attractions(page=0, keyword=''){
=======
// fetch data
async function get_attraction(page=0, keyword=''){
>>>>>>> 88d0f6f852c7533b882bcc01eb86c1fc6783dcdc
    let response = await fetch(`http://127.0.0.1:3000/api/attractions?page=${page}&keyword=${keyword}`);
    let response_to_json = await response.json()
    return response_to_json
}



function creat_block(insert_data){
    const img_ur = insert_data[0][0][0];
    const sceen_name = insert_data[1];
    const mrt = insert_data[2];
    const cat = insert_data[3];
    const id = insert_data[4];
    const creat_div_as_block = document.createElement('div');
    const creat_imag_block = document.createElement('img');
    const creat_div_for_info = document.createElement('div');
    const creat_div_for_name = document.createElement('div');
    const creat_div_for_mrt_cat = document.createElement('div');
    const creat_div_for_mrt = document.createElement('div');
    const creat_div_for_cat = document.createElement('div');
    
    const text_info_name = document.createTextNode(sceen_name);
    const text_info_mrt = document.createTextNode(mrt);
    const text_info_cat = document.createTextNode(cat);
    creat_imag_block.src = img_ur;
    
    creat_div_for_name.className = "attr_name";
    creat_div_for_mrt_cat.className = "attr_info";
    creat_div_for_mrt.className = "attr_mrt";
    creat_div_for_cat.className = "attr_cat";
    creat_div_as_block.className = "block";
    creat_div_as_block.id = id;
    creat_div_for_info.className = "info_block";

    creat_div_for_name.appendChild(text_info_name);
    creat_div_for_mrt.appendChild(text_info_mrt);
    creat_div_for_cat.appendChild(text_info_cat);
    creat_div_for_mrt_cat.appendChild(creat_div_for_mrt);
    creat_div_for_mrt_cat.appendChild(creat_div_for_cat);
    creat_div_for_info.appendChild(creat_div_for_name);
    creat_div_for_info.appendChild(creat_div_for_mrt_cat);
    creat_div_as_block.appendChild(creat_imag_block);
    creat_div_as_block.appendChild(creat_div_for_info);
    return creat_div_as_block
}

async function render_page(attr_data){
    const get_main_content_bock = document.getElementById("mainContainer");
    const get_obsev_element = document.querySelector(".observer");
    for(single_data in attr_data["data"]){
        insert_data_list = [attr_data["data"][single_data]["images"], attr_data["data"][single_data]["name"], attr_data["data"][single_data]["mrt"], attr_data["data"][single_data]["category"],attr_data["data"][single_data]["id"]]
        const ceart_new_info_block = await creat_block(insert_data_list);
        get_main_content_bock.insertBefore(ceart_new_info_block, get_obsev_element);}
    // attractions image add event Listener
    const get_all_attraction_blocks = document.querySelectorAll(".block");
    get_all_attraction_blocks.forEach(single_block => {
        single_block.addEventListener("click",(event)=>{redirect_to_attraction(single_block.id)})})
    }
<<<<<<< HEAD
=======
}

async function new_page_render(){
    let attractions_data = await get_attraction(page=now_page, keyword=now_keyword);
    let nextpage = 0;
    observer.unobserve(loadingObserver)
    render_data(attractions_data);
    nextpage = attractions_data["nextPage"];
    now_page = nextpage;
    if (nextpage != null){observer.observe(loadingObserver);}
}


const  callback = async ([entry]) => {

      // 當此圖片進入 viewport 時才載入圖片
      if (entry && entry.isIntersecting) {
          // 載入圖片
        await new_page_render()
     };
  }
>>>>>>> 88d0f6f852c7533b882bcc01eb86c1fc6783dcdc



function remove_block(){
    let all_render_attra = document.querySelectorAll('.block');
    for (const element of all_render_attra){
        element.remove();}
    }


function redirect_to_attraction(id){
    document.location.href = `http://127.0.0.1:3000/attraction/${id}`;
}





// function creatStore(put_reducer, init_state){
//     const state = [init_state];
//     const subscriptions = {};
//     const reducer = put_reducer;

//     return {
//         getState : state[state.length-1],
        
//         subscribe : (key, callback) =>{
//             subscriptions[key] = callback
//         },

//         dispatch : (action) =>{
//             reducer(action)
//         },

//         updateState : (new_state) => {
//             state.push(new_state)
//         },

//         getAllstate : state,

//     }
// }