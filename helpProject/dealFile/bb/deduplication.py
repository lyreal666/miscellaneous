#!/usr/bin/env python
# -*- encoding:utf-8 -*-

import logging
import re

logging.basicConfig(level=logging.DEBUG)
debug = logging.debug

__author__ = 'LY'

'''
    
'''


def main():
    file_path = '../testwords.mlf'
    pattern = r'"\w+\.lab".*?\.'
    words = []
    with open(file_path, 'r') as fr:
        content = fr.read()
        sentences = list(set(re.findall(pattern, content, re.DOTALL)))

    with open('result.mlf', 'w') as fw:
        sentences.insert(0, '#!MLF!#')
        sentences = [s + '\n' for s in sentences]
        fw.writelines(sentences)




if __name__ == '__main__':
    main()
