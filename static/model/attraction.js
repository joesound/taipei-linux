

//fetch data for attraction page
async function get_attraction_by_id(id){
    let response = await fetch(`http://52.73.173.92:3000/api/attraction/${id}`);
    let response_to_json = await response.json()
    return response_to_json
}