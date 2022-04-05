









loadpage()








//controll
async function loadpage(){
    const user_status_data = await userStatus();
    const user_status_index =  user_status_data['data']
    const get_enter = document.querySelector("#enter");
    if (user_status_index && get_enter.className == "signin_up"){
        const getSignblock = document.querySelector(".signin_up");
        getSignblock.textContent = "登出系統"
        getSignblock.className = "logOut"
        const getlogoutblock= document.querySelector(".logOut");
        getlogoutblock.addEventListener("click", (event)=>{
            logOut();
            redirect_to_indexPage();
        })
    }
    else{
        redirect_to_indexPage();
    }
    response = await getUserbook();
    if (response["data"]){
        user_name =  user_status_data["data"]["name"]
        console.log(user_status_data)
        booking_block(user_name, response);
    }
    else{
        remove_all_block();
        user_name =  user_status_data["data"]["name"]
        book_block_empty(user_name);
    }

}

// view
function booking_block(user, booking_info){
    user_name = user
    attraction_name = booking_info["data"]["attraction"]["name"]
    image_url = booking_info["data"]["attraction"]["image"]
    book_date = booking_info["data"]["date"]
    book_time = booking_info["data"]["time"]
    book_price = booking_info["data"]["price"]
    book_locate = booking_info["data"]["attraction"]["address"]

    const getBookingheader = document.querySelector(".booking-header");
    const getAttractionimg = document.querySelector(".attraction-img");
    const getAttractioninfo = document.querySelector(".attaction-info");
    const getPayment = document.querySelector(".payment-check");
    const getDeletebook = document.querySelector(".delete-img");


    const creatAttractionname = document.createElement('div');
    const creatBookdate = document.createElement('div');
    const creatBooktime = document.createElement('div');
    const creatBookprice = document.createElement('div');
    const creatBookaddress = document.createElement('div');

    const datespan = document.createElement('span');
    const timespan = document.createElement('span');
    const pricespan = document.createElement('span');
    const addressspan = document.createElement('span');

    creatAttractionname.className = "attraction-name"
    creatBookdate.className = "bookd-date"
    creatBooktime.className = "book-time"
    creatBookprice.className = "book-price"
    creatBookaddress.className = "book-address"


    datespan.textContent = book_date
    timespan.textContent = book_time
    pricespan.textContent = book_price
    addressspan.textContent = book_locate


    getBookingheader.textContent = `您好，${user_name}，帶預訂的行程如下:`;
    getAttractionimg.src = image_url;
    creatAttractionname.textContent = `台北一日遊: ${attraction_name}`;
    creatBookdate.textContent = `日期:`;
    creatBooktime.textContent = `時間:`;
    creatBookprice.textContent = `費用:`;
    creatBookaddress.textContent = `地點:`;
    getPayment.textContent = `總價:新台幣${book_price}元`;

    creatBookdate.appendChild(datespan)
    creatBooktime.appendChild(timespan)
    creatBookprice.append(pricespan)
    creatBookaddress.append(addressspan)

    getAttractioninfo.appendChild(creatAttractionname)
    getAttractioninfo.appendChild(creatBookdate)
    getAttractioninfo.appendChild(creatBooktime)
    getAttractioninfo.appendChild(creatBookprice)
    getAttractioninfo.appendChild(creatBookaddress)

    getDeletebook.addEventListener("click", (event)=>{
        delete_booking();
    });
}


function remove_all_block(){
    const getAttractionContainer = document.querySelector(".attraction-container");
    const getContactContainer = document.querySelector(".user-contact-container");
    const getPaymentContainer = document.querySelector(".payment-container");
    const getFinalContainer = document.querySelector(".final-submit-container");

    getAttractionContainer.remove();
    getContactContainer.remove();
    getPaymentContainer.remove();
    getFinalContainer.remove();

}

function book_block_empty(name){
    const getMaincontainer = document.querySelector(".main_container");
    const getEndbanner = document.querySelector(".endBannar");
    const getEndbannercontent = document.querySelector(".endBannar-content");
    
    const creatBookingcontent = document.createElement('div');
    const creatBookingheader = document.createElement('div');
    const creatNobook = document.createElement('div');

    creatBookingcontent.className = "nobook-container"
    creatBookingheader.className = "nobook-header"
    creatNobook.className = "nobook-content"

    creatBookingheader.textContent = `您好，${name}，帶預訂的行程如下:`;
    creatNobook.textContent = "目前沒有任何預定的行程";
    getEndbanner.style.height = "100vh"
    getEndbannercontent.style.marginTop = "45px"

    creatBookingcontent.appendChild(creatBookingheader)
    creatBookingcontent.appendChild(creatNobook)
    getMaincontainer.appendChild(creatBookingcontent)

}

async function delete_booking(){
    const info = await deleteUserbook();
    if (info["ok"]==true){
        location.reload();
    }
    else{
        alert(info["message"]);
    }
}


const get_sigin_block = document.querySelector(".signin_up");
get_sigin_block.addEventListener("click", (event)=>{siginModal()})



function siginModal(){
    const signinup_block = document.querySelector("#enter");
    if (signinup_block.className=="signin_up"){

    const signin_modal_block = document.querySelector(".signinModal");
    signin_modal_block.style.display = "flex";
    const close_bt = document.querySelector("#close1");
    close_bt.addEventListener("click", (event)=>{
        signin_modal_block.style.display = "none";
       
    }) 
    window.onclick = function(event) {
        if (event.target == signin_modal_block) {
            signin_modal_block.style.display = "none";

        }}
     
    const signup_block = document.querySelector("#end-text-sigin");
    signup_block.addEventListener("click", (event)=>{
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
    const signup_modal_block = document.querySelector(".signupModal");
    signup_modal_block.style.display = "flex";
    const close_bt = document.querySelector("#close2");
    close_bt.addEventListener("click", (event)=>{
        signup_modal_block.style.display = "none";
    }) 
    window.onclick = function(event) {
        if (event.target == signup_modal_block) {
            signup_modal_block.style.display = "none";
        }}
     
    const signup_block = document.querySelector("#end-text-sigup");
    signup_block.addEventListener("click", (event)=>{
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



// call apis
async function getUserbook(){
    let response = await fetch(`${local}api/booking`,{
        method: 'GET',
        credentials: 'include',
    });
    let response_to_json = await response.json()
    return response_to_json
}

async function deleteUserbook(){
    let response = await fetch(`${local}api/booking`,
    {method:'DELETE',
    credentials: 'include'});
    let response_to_json = await response.json()
    return response_to_json
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



// route
const get_web_title = document.querySelector(".page_title");
get_web_title.addEventListener("click",()=>{redirect_to_indexPage()})
function redirect_to_indexPage(){
    document.location.href = `${local}`;
}
