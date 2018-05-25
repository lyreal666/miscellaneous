#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging

import openpyxl
from utils.dealData import *

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


def write_result(result_data):
    wb = openpyxl.Workbook()
    ws = wb.active

    head_one_row = []
    head_one_row.append('')
    ks = sorted(result_data.keys(), key=lambda x: int(x[0:-1]))

    for d in ks:
        max_width = get_width(result_data, d)
        for i in range(max_width):
            if i == (0 + max_width) // 2:
                head_one_row.append(d)
            else:
                head_one_row.append('')
        head_one_row.append('   ***')
    ws.append(head_one_row)

    max_floor = get_max_floor(result_data)
    for i in range(1, max_floor + 1):
        one_row = []
        ac_row = []
        one_row.append(str(i) + '楼')
        ac_row.append('')
        for d in ks:
            max_width = get_width(result_data, d)
            if i in result_data[d].keys():
                for j in range(max_width - len(result_data[d][i])):
                    result_data[d][i].append('')
                ac_data = [gps[3] if not isinstance(gps, str) and gps[3] else gps for gps in result_data[d][i]]
                row_data = [get_room_number(gps) if not isinstance(gps, str) else gps for gps in result_data[d][i]]
                one_row += row_data
                ac_row += ac_data
            else:
                blank_row = ['' for i in range(max_width)]
                one_row += blank_row
                ac_row += blank_row
            one_row.append('  ***')
            ac_row.append('  ***')
        ws.append(one_row)
        ws.append(ac_row)

    ws.title = 'dealedRoomNumber'
    wb.save(filename='result.xlsx')



def main():
    pass


if __name__ == '__main__':
    main()
