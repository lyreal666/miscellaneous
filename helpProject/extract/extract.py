#!usr/bin/env python3
# -*- coding： utf-8 -*-

import os

filepath = "./"
resultPath = './codetrain.scp'
substr = '' # 不需要的路径前缀,比如c:/proc

def getSuffix(file_whole_name):
	_,file_suffix = os.path.splitext(file_whole_name)
	return file_suffix

useful_files = []

def get_useful_files(fp):
	r"""
	可以用相对路径
	"""
	abs_path = os.path.abspath(fp)
	for f in os.listdir(abs_path):
		abs_f_path = os.path.join(abs_path, f)
		if os.path.isdir(abs_f_path):
			get_useful_files(abs_f_path)
		else:
		    if getSuffix(abs_f_path) == '.wav':
		    	useful_files.append(abs_f_path)


with open(resultPath, 'w') as fw:
	get_useful_files(filepath)
	result_lines = []
	for f in useful_files:
		line = ('%s %smfc\n' % (f, f[0: -3])).replace(substr, '')
		result_lines.append(line)
	fw.writelines(result_lines)