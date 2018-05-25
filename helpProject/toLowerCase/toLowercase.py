#!/usr/bin/env python3
# -*- coding:utf-8 -*-

for file_name in ['dict2', 'wdnet']:
	result_words = ''
	with open(file_name, 'r') as fr:
		result_words = fr.read().lower()
	with open(file_name, 'w') as fw:
		fw.write(result_words)

