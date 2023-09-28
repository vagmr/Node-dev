'''
@文件        :addId.py
@说明        :新的开始
@时间        :2023/09/28 18:41:00
@作者        :vagmr
@版本        :1.0
'''
import json

# 读取JSON数据
with open('book.json', 'r') as file:
    data = json.load(file)

# 为每个书籍对象添加 'id' 属性
for idx, book in enumerate(data['books'], start=1):
    book['id'] = idx

# 将带有 'id' 属性的数据保存回JSON文件
with open('bookIdx.json', 'w') as file:
    json.dump(data, file, indent=4)
