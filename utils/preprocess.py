import json

with open('./data/taipei-attractions.json',encoding="utf-8") as json_file:
    data = json.load(json_file)
    all_bus_data = []   #[bus1,bus2]
    all_mrt_data = []   #[mrt1,mrt2]
    all_cat1_data = []  #[cat1-1,cat1-2]
    all_cat2_data = []  #[cat2-1,cat2-2]
    all_image = []  # [[_id,image],[_id,image]]
    main_data = []  # [[_id, stitle, xbody, address, longitude, latitude],[_id, stitle, xbody, address, longitude, latitude]]
    all_bus = []
    for info in data["result"]["results"]:
        main_data.append([info["_id"],info["stitle"],info["xbody"],info["address"],info["longitude"],info["latitude"]])
        all_image.append([info["_id"],info["file"]])
        all_cat2_data.append(info["CAT2"])
        all_cat1_data.append(info["CAT1"])
        all_mrt_data.append(info["MRT"])
        find_bus_index = info["info"].find("公車")
        all_bus_data.append([info["_id"],info["info"][find_bus_index:-1]])
        all_bus.append(info["info"][find_bus_index:-1])

