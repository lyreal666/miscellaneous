#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging
from utils.writeResult import *

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


def main():
    # 读取excel
    excel_file_path = input('输入xlsx文件路径:')
    sheet_name = input('输入表名:')
    # excel_file_path = 'test.xlsx'
    # sheet_name = '电视用户汇总'
    data, access_name = read07Excel(excel_file_path, sheet_name)
    result_data = deal_data(data, access_name)
    write_result(result_data)


if __name__ == '__main__':
    main()

# 最常用的配置。WPA-PSK 加密方式。
network={
ssid="TP-LINK_0A4A"
psk="527527527"
priority=5
}
 
network={
ssid="lyreal666"
priority=4
}