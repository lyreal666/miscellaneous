#!usr/bin/env python3
# -*- coding:utf-8 -*-

fr_m0 = open('monophones0', 'r')
fr_proto = open('proto', 'r')

mo_lines = fr_m0.readlines()
proto_lines = fr_proto.readlines()

result_lines = proto_lines[4:]
phoneme_lines = ['~h "%s"\n' % phoneme.strip() for phoneme in mo_lines]
result_lines = phoneme_lines + result_lines 
with open('hmmdefs', 'w') as fw:
	fw.writelines(result_lines)

fr_m0.close()
fr_proto.close()
	