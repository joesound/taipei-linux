

// fetch data for index page
export async function get_attractions(page=0, keyword=''){
    let response = await fetch(`http://52.73.173.92:3000/api/attractions?page=${page}&keyword=${keyword}`);
    let response_to_json = await response.json()
    return response_to_json
}