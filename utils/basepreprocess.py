import json
from data import insert_single_data, inset_bus_data, inset_main_data, inset_image_data
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
        main_data.append([info["_id"],info["stitle"],info["xbody"],info["address"],info["longitude"],info["latitude"],info["CAT1"],info["CAT2"],info["MRT"]])
        all_image.append([info["_id"],info["file"].split("https:")])
        all_cat2_data.append(info["CAT2"])
        all_cat1_data.append(info["CAT1"])
        all_mrt_data.append(info["MRT"])
        find_bus_index = info["info"].find("公車")
        all_bus_data.append([info["_id"],info["info"][find_bus_index:-1]])
        all_bus.append(info["info"][find_bus_index:-1])

all_cat1_data = list(set(all_cat1_data))
all_cat2_data = list(set(all_cat2_data))
all_mrt_data = list(set(all_mrt_data))

insert_tables = ["cat1", "cat2", "mrt"]
insert_item_name = ["cat1_name", "cat2_name", "mrt_name"]
insert_datas = [all_cat1_data, all_cat2_data, all_mrt_data]


# for i in main_data:

#     info = inset_main_data(i)
#     print(i[0],info)


for i in range(len(all_image)):
    for urls in all_image[i][1]:
        if (".mp3" in urls) or (".flv" in urls) or (urls==""):
            print(urls)
            continue
        urls = "https:" + urls
        infor = inset_image_data(all_image[i][0],urls)
        print(all_image[i][0], infor)

# for i in range(len(all_bus_data)):
#     info = inset_bus_data(all_bus_data[i][0],all_bus_data[i][1])
#     print(all_bus_data[i][0], info)

