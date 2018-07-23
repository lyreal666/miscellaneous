from bs4 import BeautifulSoup
from urllib import request
import json

file_path = './view-source_moni.cn.html'

with request.urlopen('http://moni.cn/') as rg:
    html = rg.read().decode('utf-8')

bs = BeautifulSoup(html)

item_titles = [h2.get_text() for h2 in bs.select('.list.top_10 .item_right h2')]
item_imgs = [img['src'] for img in bs.select('.list.top_10 .item_img img')]
item_dates = [div.get_text() for div in bs.select('.list.top_10 .item_right div.item_right_gengxinshijian')]
item_sizes = [span.get_text() for span in bs.select('.list.top_10 .item_img .daxiao')]
item_details = [div.get_text() for div in bs.select('.list.top_10 .item_right .item_right_jieshao')]
item_rights = bs.select('.list.top_10 .item_right')

item_list = []
for index, item_title in enumerate(item_titles):
    item_obj = {}
    item_obj['classify'] = "standard"
    item_obj['icon'] = 'url(%s)' % item_imgs[index]
    item_obj['updateDate'] = item_dates[index]
    item_obj['size'] = item_sizes[index]
    item_obj['details'] = item_details[index]
    
    # 处理links, 有些item没有Links
    bottom = item_rights[index].select('.item_bottom')
    if not len(bottom) == 0:
        download_hrefs = [a.get('href') for a in bottom[0].select('a')]
        item_obj['baiduDownload'] = download_hrefs[0]
        item_obj['localDownload'] = download_hrefs[1]
        item_obj['useInstructions'] = download_hrefs[2]
    
    part2_left = item_rights[index].find_parent(class_='index_part2_left_item')
    title_div = part2_left.find_previous_sibling(class_="index_part2_left_title")
    title = title_div.select('h2')[0].get_text()
    item_obj['classify'] = title
    item_list.append(item_obj)
    # try:
    #     title_div = item_rights[index].parent.parent.parent.previous_sibling.previous_sibling.previous_sibling.previous_sibling.previous_sibling
    #     title = title_div.select('h2')[0].get_text()
    #     item_obj['classify'] = title
    #     item_list.append(item_obj)
    # except Exception as e:
    #     print(title_div)
json.dump(item_list, open('./items.json', 'w', encoding='utf-8'), ensure_ascii=False)
    
        