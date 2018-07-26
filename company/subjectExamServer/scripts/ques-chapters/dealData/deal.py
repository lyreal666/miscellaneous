import re
import json


chapters_file = '../resource/testData/txtData/chapter.txt'
chapters_dict = {}
with open(chapters_file, 'r', encoding='utf-8') as fr:
    content = fr.read()
    pattern = re.compile(r'(\S+(/\S+){0,2})((\n\d+\s\S+)+)', re.M)
    matches = pattern.findall(content)
    chapter_pattern = re.compile(r'\n(\d+)\s(\S+)', re.M)
    
    for match in matches:
        car_type = match[0]
        chapters_dict[car_type] = {}
        chapters = chapter_pattern.findall(match[2])
        for chapter in chapters:
            number = chapter[0]
            chapter_title = chapter[1]
            chapters_dict[car_type][number]= chapter_title
json.dump(chapters_dict, open('./chapters.json', 'w', encoding="utf-8"), ensure_ascii=False)
    
number2chapter = {}
for car_type in chapters_dict:
    for number in chapters_dict[car_type]:
        number2chapter[number] = chapters_dict[car_type][number]

ques_file = '../resource/testData/txtData/questions.txt'
with open(ques_file, 'r', encoding='utf-8') as fr:
    # 截取数据
    content = fr.read()
    pattern = re.compile(r'(#\s(\d+\s)(\d+\s)(\d+\s)(\d+\s)(\d+\s)(\d+\s)(\d+\s)(\n\*.*?)(\n\*.*?)(\n\*.*?)(\n\*.*?)(\n\*.*?)(\n\*.*))', re.M)
    matches = pattern.findall(content)
    
    questions = dict()
    # 共享数据可能存在风险
    subjects = ['科目一', '科目二', '科目三', '科目四']
    car_types = ['小车', '客车', '货车']
    number2answer = ['A', 'B', 'C', 'D']
    
    # 处理数据
    qs = []
    losed_chapter = []
    for match in matches:
        # print('题号:', match[1])
        # print(match)
        try:
            question = {}
            question['number'] = int(match[1].strip())
            question['subject'] = subjects[int(match[2].strip()) - 1]
            question['car_types'] = ''
            car_type = bin(int(match[3].strip()))[2:].zfill(3)
            for index, char in enumerate(car_type):
                question['car_types'] += car_types[index] if char == '1' else ''
            try:
                question['chapter'] = number2chapter[match[4].strip()]
            except Exception as e:
                question['chapter'] = '未获取'
                losed_chapter.append({'number': match[1], 'chapter': match[4]})
            _type = match[5].strip()

            if _type == '0':
                question['type'] = '判断题'
            elif _type == '1':
                question['type'] = '单选题'
            else:
                question['type'] = '多选题'
            answer = ''
            for c in '1234':
                if c in match[6]:
                    answer += number2answer[int(c) - 1]
            question['answer'] = answer
            question['has_pic'] = int(match[7].strip())
            question['title'] = match[8].strip()[1:]
            options = [match[9], match[10], match[11], match[12]]
            question['options'] = [option.strip()[1:] for option in options]
            question['detail'] = match[13].strip()[1 : ]
            qs.append(question)
        except Exception as e:
            print('题目:', match[0])
            print(e)
            exit()
    json.dump(qs, open('./questions.json', 'w', encoding='utf-8'), ensure_ascii=False)
    print(losed_chapter)