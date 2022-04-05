// import {loadmore, queryBykeywor} from "./static/controller/controller.mjs"
// import {creatStore} from "./static/store/store.mjs"

//reducer for index pageupdate

const local = "http://127.0.0.1:3000/"

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



function siginModal(){
    const signinup_block = document.querySelector("#enter");
    if (signinup_block.className=="signin_up"){
    observer.unobserve(loadingObserver);
    const signin_modal_block = document.querySelector(".signinModal");
    signin_modal_block.style.display = "flex";
    const close_bt = document.querySelector("#close1");
    close_bt.addEventListener("click", (event)=>{
        clean_sig_input();
        signin_modal_block.style.display = "none";
        observer.observe(loadingObserver);
    }) 
    window.onclick = function(event) {
        if (event.target == signin_modal_block) {
            clean_sig_input();
            signin_modal_block.style.display = "none";
            observer.observe(loadingObserver);
        }}
     
    const signup_block = document.querySelector("#end-text-sigin");
    signup_block.addEventListener("click", (event)=>{
        clean_sig_input();
        signin_modal_block.style.display = "none";
        sigupModal();
        })

    const signin_bt = document.querySelector("#sigin_bt");
    signin_bt.addEventListener("click", async (event)=>{
        user_sinin_data = siginInputcheck();
        if (user_sinin_data){
        const getmassageblock = document.querySelector("#siginmessage");
        const get_siginmodal_block = document.querySelector("#sigin-modal-content");
        response = await SigIn(user_sinin_data["email"],user_sinin_data["password"])
        if (response['ok']==true){
            signin_modal_block.style.display = "none";
            location.reload();
        }
        if (response['error']==true)
            get_siginmodal_block.style.height = "300px"
            getmassageblock.textContent = response["message"]
            getmassageblock.style.color = "red"
        }})}
    else{
        return 0
    }
}



function sigupModal(){
    observer.unobserve(loadingObserver);
    const signup_modal_block = document.querySelector(".signupModal");
    signup_modal_block.style.display = "flex";
    const close_bt = document.querySelector("#close2");
    close_bt.addEventListener("click", (event)=>{
        clean_sig_input();
        signup_modal_block.style.display = "none";
        observer.observe(loadingObserver);
    }) 
    window.onclick = function(event) {
        if (event.target == signup_modal_block) {
            clean_sig_input();
            signup_modal_block.style.display = "none";
            observer.observe(loadingObserver);
        }}
     
    const signup_block = document.querySelector("#end-text-sigup");
    signup_block.addEventListener("click", (event)=>{
        clean_sig_input();
        signup_modal_block.style.display = "none";
        siginModal()
        })

    const signup_bt = document.querySelector("#sigup_bt");
    signup_bt.addEventListener("click", async (event)=>{
        user_sinup_data = sigupInputcheck();
        if (user_sinup_data){
        response = await sigUp(user_sinup_data["name"],user_sinup_data["email"],user_sinup_data["password"])
        const getmassageblock = document.querySelector("#sigupmessage");
        const get_sigupmodal_block = document.querySelector("#sigup-modal-content");
        if (response['ok']==true){
            console.log(response['ok'])
            get_sigupmodal_block.style.height = "350px"
            getmassageblock.textContent = "註冊成功"
            getmassageblock.style.color = "green"
            signup_modal_block.style.display = "none";
            observer.observe(loadingObserver);
        }
        if (response['error']==true)
            get_sigupmodal_block.style.height = "350px"
            getmassageblock.textContent = response['message']
            getmassageblock.style.color = "red"
        }})
}


function sigupInputcheck(){
    const getInputname = document.querySelector("#sigupname");
    const getInputemail = document.querySelector("#sigupemail");
    const getInputpassword = document.querySelector("#siguppassword");
    const getmassageblock = document.querySelector("#sigupmessage");
    const get_sigupmodal_block = document.querySelector("#sigup-modal-content");
    if (getInputname.value == ''){
        getInputname.style.borderColor = "red"
        get_sigupmodal_block.style.height = "350px"
        getmassageblock.textContent = "請輸入姓名"
        getmassageblock.style.color = "red"
        return 0
    }
    else{
        getInputname.style.borderColor = "green"
    }
    if (getInputemail.value == ''){
        getInputemail.style.borderColor = "red"
        get_sigupmodal_block.style.height = "350px"
        getmassageblock.textContent = "請輸入信箱"
        getmassageblock.style.color = "red"
        return 0 
    }
    else{
        getInputemail.style.borderColor = "green"
    }
    if (getInputpassword.value == ''){
        getInputpassword.style.borderColor = "red"
        get_sigupmodal_block.style.height = "350px"
        getmassageblock.textContent = "請輸入密碼"
        getmassageblock.style.color = "red"
        return 0 
    
    }
    else{
        getInputpassword.style.borderColor = "green"
    }

    if(getInputname.value != '' && getInputemail.value != '' && getInputpassword.value != '' ){
        user_info = {"name":getInputname.value, "email":getInputemail.value, "password":getInputpassword.value}
        getInputname.value = '';
        getInputemail.value = '';
        getInputpassword.value = '' ;
        return user_info
    }
}

function clean_sig_input(){
    const getInputnamesigup = document.querySelector("#sigupname");
    const getInputemailsigup = document.querySelector("#sigupemail");
    const getInputpasswordsigup = document.querySelector("#siguppassword");
    const getmassageblocksigup = document.querySelector("#sigupmessage");
    const getInputemailsigin = document.querySelector("#siginemail");
    const getInputpasswordsigin = document.querySelector("#siginpassword");
    const getmassageblocksigin = document.querySelector("#siginmessage");
    getInputnamesigup.value = ""
    getInputemailsigup.value = ""
    getInputpasswordsigup.value = ""
    getmassageblocksigup.value = ""
    getInputemailsigin.value = ""
    getInputpasswordsigin.value = ""
    getmassageblocksigin.value = ""
}


function siginInputcheck(){
    const getInputemail = document.querySelector("#siginemail");
    const getInputpassword = document.querySelector("#siginpassword");
    const getmassageblock = document.querySelector("#siginmessage");
    const get_siginmodal_block = document.querySelector("#sigin-modal-content");
    if (getInputemail.value == ''){
        getInputemail.style.borderColor = "red"
        get_siginmodal_block.style.height = "300px"
        getmassageblock.textContent = "請輸入信箱"
        getmassageblock.style.color = "red"
        return 0
    }
    else{
        getInputemail.style.borderColor = "green"
    }
    if (getInputpassword.value == ''){
        getInputpassword.style.borderColor = "red"
        get_siginmodal_block.style.height = "300px"
        getmassageblock.textContent = "請輸入密碼"
        getmassageblock.style.color = "red"
        return 0
    }
    else{
        getInputpassword.style.borderColor = "green"
    }

    if(getInputemail.value != '' && getInputpassword.value != '' ){
        user_info = {"email":getInputemail.value, "password":getInputpassword.value}
        getInputemail.value = '';
        getInputpassword.value = '' ;
        return user_info
    }
}



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
     
      currentListeners.push(listener)//放入一個監聽
    }
  
    async function dispatch(action){
        currentState = await reducer(action)
 
    }

  
    return {getState,subscribe,dispatch}
  }



// index page controller
async function loadmore(state){ //state {"page:","keyword"}
    const user_status_data = await userStatus();
    const user_status_index =  user_status_data['data']
    const get_enter = document.querySelector("#enter");
    if (user_status_index && get_enter.className == "signin_up"){
        const getSignblock = document.querySelector(".signin_up");
        getSignblock.textContent = "登出系統"
        getSignblock.className = "logOut"
        const getlogoutblock= document.querySelector(".logOut");
        getlogoutblock.addEventListener("click", (event)=>{
            console.log(event)
            logOut();
            location.reload();
        })

    }
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

async function redirect_to_booking(){
    const user_status_data = await userStatus();
    const user_status_index =  user_status_data['data']
    if (user_status_index){
        redirect_to_bookingPage();
        }
    else{
        siginModal();
    }
}



async function sigUp(name, email, password){
    let response = await fetch(`${local}api/user`,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({"name":name, "email":email, "password":password})
    });
    let response_to_json = await response.json()
    return response_to_json
}

async function logOut(){
    let response = await fetch(`${local}api/user`,
        {method:'DELETE',
        credentials: 'include'});
    let response_to_json = await response.json()
    
}

async function SigIn(email, password){
    let response = await fetch(`${local}api/user`,
        {method:'PATCH',
        credentials: 'include',
        body: JSON.stringify({"email":email, "password":password})
    });
    let response_to_json = await response.json()
    return response_to_json
}


async function userStatus(){
    let response = await fetch(`${local}api/user`,{
        method: 'GET',
        credentials: 'include',
    });
    let response_to_json = await response.json()
    return response_to_json
}






// fetch data for index page
async function get_attractions(page=0, keyword=''){
    let response = await fetch(`${local}api/attractions?page=${page}&keyword=${keyword}`);
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
        const ceart_new_info_block = creat_block(insert_data_list);
        get_main_content_bock.insertBefore(ceart_new_info_block, get_obsev_element);}
    // attractions image add event Listener
    const get_all_attraction_blocks = document.querySelectorAll(".block");
    get_all_attraction_blocks.forEach(single_block => {
        single_block.addEventListener("click",(event)=>{redirect_to_attraction(single_block.id)})})
    }
    const get_sigin_block = document.querySelector(".signin_up");
    get_sigin_block.addEventListener("click", (event)=>{siginModal()})
    const get_tutorial_tilte = document.querySelector(".booking");
    get_tutorial_tilte.addEventListener("click",()=>{redirect_to_booking()})



function remove_block(){
    let all_render_attra = document.querySelectorAll('.block');
    for (const element of all_render_attra){
        element.remove();}
    }


function redirect_to_attraction(id){
    document.location.href = `${local}attraction/${id}`;
}

function redirect_to_bookingPage(){
    document.location.href = `${local}booking`;
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