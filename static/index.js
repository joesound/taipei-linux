


let now_page = 0;
let now_keyword = null;


// fetch data
async function get_attraction(page=0, keyword=''){
    let response = await fetch(`http://52.73.173.92:3000/api/attractions?page=${page}&keyword=${keyword}`);
    let response_to_json = await response.json()
    return response_to_json
}

function creat_block(insert_data){
    const img_ur = insert_data[0][0];
    const sceen_name = insert_data[1];
    const mrt = insert_data[2];
    const cat = insert_data[3];
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


async function render_data(attr_data){
    const get_main_content_bock = document.getElementById("mainContainer");
    const get_obsev_element = document.querySelector(".observer");
    for(single_data in attr_data["data"]){
        insert_data_list = [attr_data["data"][single_data]["images"], attr_data["data"][single_data]["name"], attr_data["data"][single_data]["mrt"], attr_data["data"][single_data]["category"]]
        const ceart_new_info_block = await creat_block(insert_data_list);
        get_main_content_bock.insertBefore(ceart_new_info_block, get_obsev_element);
    }
}

async function new_page_render(){
    let attractions_data = await get_attraction(page=now_page, keyword=now_keyword);
    let nextpage = 0;
    render_data(attractions_data);
    nextpage = attractions_data["nextPage"];
    now_page = nextpage;
}


const  callback = async ([entry]) => {

      // 當此圖片進入 viewport 時才載入圖片
      if (entry && entry.isIntersecting) {
          // 載入圖片
        await new_page_render()
     };
  }


const get_main_content_block = document.querySelector(".main_content");
const loadingObserver = document.querySelector('.observer');
const placeholder = document.querySelector('.placeholder');
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
    };

let observer = new IntersectionObserver(callback, options);
if (now_page != null){observer.observe(loadingObserver);}



async function query_keyword(keyword){
    keyword = keyword.value;
    if (keyword){
        now_page = 0;
        observer.unobserve(loadingObserver)
        let all_render_attra = document.querySelectorAll('.block');
        for (const element of all_render_attra){
            element.remove();
        };
        
        let attractions_data = await get_attraction(page=now_page, keyword=keyword);
        await render_data(attractions_data);
        nextpage = attractions_data["nextPage"];
        now_page = nextpage;
        now_keyword = keyword
        if (now_page != null){observer.observe(loadingObserver);}
    }
    else{
        return 0
    }
}



let get_input_keyword = document.querySelector(".inputKeywords");
let get_input_keyword_button = document.querySelector(".buttonKeywords");
get_input_keyword_button.addEventListener("click", function(event){query_keyword(get_input_keyword);event.preventDefault();})



// const get_main_content_bock = document.getElementById("mainContainer");
// for(i=0;i<7;i++){
// const ceart_new_info_block = creat_block();
// get_main_content_bock.appendChild(ceart_new_info_block);
// }


// async function main(){
//     let attractions_data = await get_attraction();
//     let nextpage = 0;
//     await render_data(attractions_data)
//     nextpage = attractions_data["nextPage"]
//     now_page = nextpage;
    
// }



// main(); 