
//attraction block template @index page 

function creat_block(insert_data){
    const img_ur = insert_data[0][0][0];
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

export async function render_page(attr_data){
    const get_main_content_bock = document.getElementById("mainContainer");
    const get_obsev_element = document.querySelector(".observer");
    for(single_data in attr_data["data"]){
        insert_data_list = [attr_data["data"][single_data]["images"], attr_data["data"][single_data]["name"], attr_data["data"][single_data]["mrt"], attr_data["data"][single_data]["category"]]
        const ceart_new_info_block = await creat_block(insert_data_list);
        get_main_content_bock.insertBefore(ceart_new_info_block, get_obsev_element);
    }
}


export function remove_block(){
    let all_render_attra = document.querySelectorAll('.block');
    for (const element of all_render_attra){
        element.remove();}
    }


