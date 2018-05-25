#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging
import os
import re
from multiprocessing import Pool
import jieba
import math

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


gpws_paths = []


def get_paths_with_suffix(dir_path, suffix):
    r"""
    返回给定文件夹中所有后缀是suffix的文件绝对路径列表
    :param dir_path:
    :param suffix: 
    :return: 
    """
    abs_path = os.path.abspath(dir_path)
    abs_path_list = [os.path.join(abs_path, file)for file in os.listdir(abs_path)]
    for path in abs_path_list:
        if os.path.isdir(path):
            get_paths_with_suffix(path, suffix)
        elif os.path.isfile(path) and os.path.splitext(path)[1] == suffix:
            gpws_paths.append(path)
    
    return gpws_paths


gpws = get_paths_with_suffix


def get_zh_str(string):
    r"""
    返回给定字符串中的中文
    :param string:
    :return:
    """
    pattern = re.compile(r'[\u4e00-\u9fa5]+')
    return pattern.findall(string)


def deal(path_list):
    for file in path_list:
        with open(file, 'r', encoding='utf-8') as fr:
            debug('正在处理%s..' % file)
            content = fr.read()
            zh_words = get_zh_str(content)
            content = re.sub(r'[\u4e00-\u9fa5]+', '', content)
            content = content.strip()
            content = re.sub(r'\s+', ' ', content)
            zh_sequence = ''.join(zh_words)
            divide_words = jieba.cut(zh_sequence, cut_all=False)
            jieba_sequence = ' '.join(divide_words)
            content = jieba_sequence + ' ' + content
        with open(file, 'w', encoding='utf-8') as fw:
            fw.write(content)


def main():
    path = './train'
    path_list = gpws(path, '.txt')
    debug('共搜索到%d份处理文件' % len(path_list))

    tasks_args = []
    for p in range(math.ceil(len(path_list) / 20)):
        start = p * 20
        end = min((p + 1) * 20, len(path_list) + 1)
        tasks_args.append(path_list[start: end])

    pool = Pool(5)
    pool.map(deal, tasks_args)
    pool.close()
    pool.join()


if __name__ == '__main__':
    main()
