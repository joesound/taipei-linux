import {get_attractions} from "./static/model/index.js"
import {render_page, remove_block} from "./static/view/index.js"



// index page controller
export async function loadmore(state){ //state {"page:","keyword"}
    const attraction_data = await get_attractions(state.nextPage, state.nowKeyword)
    render_page(attraction_data);
    return attraction_data["nextPage"]
}


export async function queryBykeywor(state){ //state {"page:","keyword"}
    const attraction_data = await get_attractions(state.nextPage, state.nowKeyword);
    await remove_block();
    render_page(attraction_data);
    return attraction_data["nextPage"]
}






// attraction page controller