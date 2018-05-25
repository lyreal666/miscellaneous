#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging
import openpyxl

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


def read07Excel(path, sheet_name):
    r"""
    读excel文件
    :param path:
    :param sheet_name:
    :return:
    """
    wb = openpyxl.load_workbook(path, data_only=True)
    sheet = wb.get_sheet_by_name(sheet_name)
    data = []
    access_name = {}
    sp_cell = list(filter(lambda x: x.value == '安装地址', list(next(sheet.rows))))[0]
    ac_cell = list(filter(lambda x: x.value == '受理名', list(next(sheet.rows))))[0]
    for i in range(len(sheet[ac_cell.column])):
        ac = sheet[ac_cell.column][i]
        sp = sheet[sp_cell.column][i]
        if ac.value and sp.value:
            access_name[sp.value] = ac.value
    for cell in sheet[sp_cell.column]:
        if cell.value:
            data.append(cell.value)

    return data[1:], access_name


def main():
    print(read07Excel('../test.xlsx', '电视用户汇总'))


if __name__ == '__main__':
    main()
