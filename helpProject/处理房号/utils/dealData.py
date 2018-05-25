
#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging
import re

from utils.readxlsx import read07Excel

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


def sort_func(key):
    weight = 0
    if key[1] is None:
        weight += 100000
    elif key[1].strip() == '2单元':
        weight += 10000
    else:
        weight += 0

    num = key[2].strip()[0:-1]
    for i in range(4 - len(num)):
        num += '0'
    num = int(num)
    weight += num

    return weight


def get_floor(gps):
    pattern = re.compile(r"(\d+)号?")
    if gps[2] is not None:
        rs = pattern.match(gps[2])
        return int(rs.group(1)) // 100


def get_room_number(gps):
    unit = ''
    if gps[1] is not None:
        unit = gps[1].strip()
    pattern = re.compile(r"(\d+)号?")
    number = ''
    if gps[2] is not None:
        number = pattern.match(gps[2]).group(1).strip()
    if unit == '1单元':
        return 'A' + number
    elif unit == '2单元':
        return 'B' + number
    else:
        return number


def deal_data(data, access_name):
    pattern = re.compile(r"^.+?\s*(\d+栋)\s*(\d单元)?.*?(\d+号?)")
    dict_data = {}
    gpss = []
    for item in data:
        rs = pattern.match(item)
        gps = list(rs.groups())
        if access_name[item]:
            gps.append(access_name[item])
        gpss.append(gps)

    for gps in gpss:
        department = gps[0]
        if department and department.strip() != '':
            if department not in dict_data:
                dict_data[department] = []
            dict_data[department].append(gps)
    # 排序
    for d in dict_data.keys():
        dict_data[d] = sorted(dict_data[d], key=sort_func)
        # print(d, ': ')
        # for i in dict_data[d]:
        #     print('     ', i)

    result_dict = {}
    for d in dict_data.keys():
        for gps in dict_data[d]:
            floor = get_floor(gps)
            if d in result_dict:
                if floor not in result_dict[d]:
                    result_dict[d][floor] = []
            else:
                result_dict[d] = {}
                result_dict[d][floor] = []
            result_dict[d][floor].append(gps)
    return result_dict


def get_width(result_data, depart):
    max_width = 0
    for floor in result_data[depart]:
        length = len(result_data[depart][floor])
        if length > max_width:
            max_width = length
    return max_width


def get_max_floor(result_data):
    max_floor = 0
    for d in result_data.keys():
        for f in result_data[d]:
            for gps in result_data[d][f]:
                floor = get_floor(gps)
                if floor > max_floor:
                    max_floor = floor
    return max_floor


def main():
    data = read07Excel('../test.xlsx', '电视用户汇总')
    deal_data(data)


if __name__ == '__main__':
    main()
