#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('../resource/testData/txtData/testStr.txt', "r", encoding='utf-8') as fr:
    print('length:', len(fr.read()))