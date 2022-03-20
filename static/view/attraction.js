
// render image
export default function render_attraction_image(image){
    const image_tag = document.querySelector(".container_image")
    image_tag.src = image
}


// render attraction name & cat & mrt station
export default function render_attraction_name(name){
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
export default function render_intro_content(intro_content){
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
export default function render_address_content(address_content){
    const address_content_tag = document.querySelector(".container_address");
    const old_address_text_node = address_content_tag.firstChild;
    const new_address_text_node = document.createTextNode(address_content);
    if (old_address_text_node){  
        address_content_tag.replaceChild(new_address_text_node,old_address_text_node);
    }
    else{
        address_content_tag.appendChild(new_address_text_node);
    }  
}


// render Transport
export default function render_transport_content(transport_content){
    const transport_content_tag = document.querySelector(".container_transport");
    const old_transport_text_node = transport_content_tag.firstChild;
    const new_transport_text_node = document.createTextNode(transport_content);
    if (old_transport_text_node){  
        transport_content_tag.replaceChild(new_transport_text_node,old_transport_text_node);
    }
    else{
        transport_content_tag.appendChild(new_transport_text_node);
    }  
}