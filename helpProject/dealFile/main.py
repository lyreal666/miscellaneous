#!usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

file_path = './'

result_lines = []
filter_files = ['main.py', '.idea', 'result.txt']


def split_file_name(abs_path):
    _, file_full_name = os.path.split(abs_path)
    return os.path.splitext(file_full_name)


def deal():
    partten = re.compile(r'^\d\s+(\d+)\s+(.*)[.?!]?$')
    partten1 = re.compile(r'[.;,?!]')
    for f in os.listdir(file_path):
        abs_path = os.path.join(file_path, f)
        if os.path.isdir(abs_path) and f not in filter_files:
            for rfile in [os.path.join(abs_path, file) for file in os.listdir(abs_path) if file not in filter_files]:
                if os.path.splitext(rfile)[1] == '.txt':
                    with open(rfile, 'r') as fr:
                        words = fr.read()
                        match = partten.match(words)
                        if match is not None:
                            result_words = re.sub(partten1, '', match.group(2).upper())
                            result_lines.append('%s  %s\n' % (split_file_name(rfile)[0], result_words))
                        else:
                            print(words)


deal()
with open('result.txt', 'w') as fw:
    fw.writelines(result_lines)