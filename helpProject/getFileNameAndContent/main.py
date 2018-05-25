#!usr/bin/env python3
# -*- coding: utf-8 -*-

import re

file_path = './'

with open(file_path, 'r') as fr:
	content = fr.read()
	re.sub(r'"\w+\d+\.lab"', '')