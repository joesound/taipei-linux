


const get_morning_bt = document.getElementById("morning_bt");
const get_afternoon_bt = document.getElementById("afternoon_bt");
const get_tutorial_fee = document.querySelector(".tutorial_fee");
const get_image_left_bt = document.querySelector(".left-buttom");
const get_image_right_bt = document.querySelector(".right-buttom");

const get_web_title = document.querySelector(".page_title");
const get_tutorial_tilte = document.querySelector(".booking");
const get_sign_title = document.querySelector(".signin_up");

get_web_title.addEventListener("click",()=>{redirect_to_indexPage()})
get_tutorial_tilte.addEventListener("click",()=>{redirect_to_bookingPage()})

get_morning_bt.addEventListener("click",()=>{get_tutorial_fee.textContent="新台幣2000元"})
get_afternoon_bt.addEventListener("click",()=>{get_tutorial_fee.textContent="新台幣2500元"})
get_image_left_bt.addEventListener("click",()=>{befoer_image()})
get_image_right_bt.addEventListener("click",()=>{next_image()})


const init_STATE = {imageIndex:0, imageUrl:[]};
var store = createStore(imageReducer,init_STATE);

async function main(){
    const queryString = window.location.href;
    const queryId = queryString.split("/")
    let image_list = await controller_attraction(queryId[queryId.length-1]);
    let current_state = store.getState();
    current_state.imageUrl = image_list;
    console.log(current_state);
    store.dispatch({type:"init", payload:current_state})
    get_image_index_dot = document.getElementById(`image_dot_index_${0}`);
    get_image_index_dot.click();
}

main();



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
  

async function imageReducer(action){
    switch(action.type){
        case "left_click":{
            let current_state = action.payload;
            let imageURLs = current_state["imageUrl"]["data"]["images"][0]
            index = Number(current_state["imageIndex"])
            current_state["imageIndex"] = index - 1;
            new_url = imageURLs[current_state["imageIndex"]]
            get_image_index_dot = document.getElementById(`image_dot_index_${current_state["imageIndex"]}`);
            get_image_index_dot.click();
            await change_pic(new_url);
            return current_state
        }
        case "right_click":{
            let current_state = action.payload;
            let imageURLs = current_state["imageUrl"]["data"]["images"][0]
            index = Number(current_state["imageIndex"])
            current_state["imageIndex"] = index + 1;
            new_url = imageURLs[current_state["imageIndex"]];
            get_image_index_dot = document.getElementById(`image_dot_index_${current_state["imageIndex"]}`);
            get_image_index_dot.click();
            await change_pic(new_url);
            return current_state
        }
        case "click_img_btn":{
            let current_state = action.payload;
            let imageURLs = current_state["imageUrl"]["data"]["images"][0]
            current_state["imageIndex"] = action.id;
            new_url = imageURLs[current_state["imageIndex"]];
            change_pic(new_url);
            return current_state
        }
        case "init":
            let current_state = action.payload;
            return current_state
    }

}

function befoer_image(){
    let current_state = store.getState();
    
    if (current_state["imageIndex"] != 0){
        store.dispatch(
            {
                type:"left_click",
                payload:current_state
            }
        )
    }
    else{
        console.log("最左邊了")
        return 0
    }
}

function next_image(){
    let current_state = store.getState();
    let imageURLs = current_state["imageUrl"]["data"]["images"][0]
    if (current_state["imageIndex"] != imageURLs.length-1){
        store.dispatch(
            {
                type:"right_click",
                payload:current_state
            }
        )
    }
    else{
        console.log("最右邊了")
        return 0
    }
}






//controller
async function controller_attraction(id){
    const single_attraction_data = await get_attraction_by(id);
    render_attraction_image(single_attraction_data["data"]["images"]);
    render_cat_mrt(single_attraction_data["data"]["category"],single_attraction_data["data"]["mrt"]);
    render_attraction_name(single_attraction_data["data"]["name"]);
    render_intro_content(single_attraction_data["data"]["description"]);
    render_address_content(single_attraction_data["data"]["address"]);
    render_transport_content(single_attraction_data["data"]["transport"]);
    return single_attraction_data
}


function change_pic(image_url){
    let main_image_container = document.querySelector(".main_image");
    main_image_container.src = image_url
}


function image_index_bt_click(id){
    const get_img_click_tag = id.split("_");
    const img_id = get_img_click_tag[get_img_click_tag.length-1]
    let current_state = store.getState();
    store.dispatch(
        {
            type:"click_img_btn",
            payload:current_state,
            id:img_id
        })

}


// fetch data for attration page
async function get_attraction_by(id){
    let response = await fetch(`http://127.0.0.1:3000/api/attraction/${id}`);
    let response_to_json = await response.json()
    return response_to_json
}



// render image
function render_attraction_image(image_url){
    const image_tag = document.querySelector(".container_image");
    const creat_imag_block = document.createElement('img');
    creat_imag_block.className = "main_image"
    creat_imag_block.src = image_url[0][0];
    image_tag.appendChild(creat_imag_block);
    const creat_imag_dot_block = document.createElement('div');
    creat_imag_dot_block.className = "image_index_dot_block"
    for(let i=0;i<image_url[0].length;i++){
        creat_new_dot = render_radio_bt(i);
        creat_imag_dot_block.appendChild(creat_new_dot)
    }
    image_tag.appendChild(creat_imag_dot_block);
}


function render_radio_bt(index){
    const creat_label_for_image_index = document.createElement('label');
    const creat_radio_for_image_index = document.createElement('input');
    const creat_span_for_image_index = document.createElement('span');
    creat_label_for_image_index.className = "image_dot_lable";
    creat_radio_for_image_index.className = "image_dot_bt"
    creat_radio_for_image_index.id = `image_dot_index_${index}`;
    creat_radio_for_image_index.type = "radio";
    creat_radio_for_image_index.name = "image_dot_bt"
    creat_span_for_image_index.className = "checkmark_for_image"
    creat_label_for_image_index.appendChild(creat_radio_for_image_index);
    creat_label_for_image_index.appendChild(creat_span_for_image_index);
    creat_radio_for_image_index.addEventListener("click",(event)=>{image_index_bt_click(creat_radio_for_image_index.id)})
    return creat_label_for_image_index
}
//cat&mrt render
function render_cat_mrt(cat,mrt){
    const cat_mrt_div = document.querySelector(".cat_station");
    const cat_mrt_text = cat + "at" + mrt;
    const new_cat_mrt_text_node = document.createTextNode(cat_mrt_text);
    cat_mrt_div.appendChild(new_cat_mrt_text_node)
}


// render attraction name & cat & mrt station
function render_attraction_name(name){
    const attraction_name_tag = document.querySelector(".attraction_name");
    const old_name_text_node = attraction_name_tag.firstChild;
    const new_name_text_node = document.createTextNode(name);
    if (old_name_text_node){  
        attraction_name_tag.replaceChild(new_name_text_node,old_name_text_node);
    }
    else{
        attraction_name_tag.appendChild(new_name_text_node);
    }  
}


// render introduction 
function render_intro_content(intro_content){
    const intro_content_tag = document.querySelector(".container_intro");
    const old_intro_text_node = intro_content_tag.firstChild;
    const new_intro_text_node = document.createTextNode(intro_content);
    if (old_intro_text_node){  
        intro_content_tag.replaceChild(new_intro_text_node,old_intro_text_node);
    }
    else{
        intro_content_tag.appendChild(new_intro_text_node);
    }  
}


// render address
function render_address_content(address_content){
    const address_content_tag = document.querySelector(".container_address");
    const old_address_text_node = address_content_tag.lastChild;
    const new_address_text_node = document.createTextNode(address_content);
    if (old_address_text_node){  
        address_content_tag.replaceChild(new_address_text_node,old_address_text_node);
    }
    else{
        address_content_tag.appendChild(new_address_text_node);
    }  
}


// render Transport
function render_transport_content(transport_content){
    const transport_content_tag = document.querySelector(".container_transport");
    const old_transport_text_node = transport_content_tag.lastChild;
    const new_transport_text_node = document.createTextNode(transport_content);
    if (old_transport_text_node){  
        transport_content_tag.replaceChild(new_transport_text_node,old_transport_text_node);
    }
    else{
        transport_content_tag.appendChild(new_transport_text_node);
    }  
}


function redirect_to_indexPage(){
    document.location.href = `http://127.0.0.1:3000/`;
}

function redirect_to_bookingPage(){
    document.location.href = `http://127.0.0.1:3000/booking/`;
}




