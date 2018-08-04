#coding:utf-8
#使用制表符或换行符来添加空白
#\t是制表，\n是换行
print("Languages:\t\nPython\n\tC\n\tJavaScript")

#删除空白,末尾方法.rstrip
kongbai = '  "chenqiru"  '
print (kongbai)
print(kongbai.rstrip())

#将操作的结果存回变量中
kongbai=kongbai.rstrip()
print(kongbai)

kongbai=kongbai.lstrip()
print(kongbai)

#lstrip清除字符串左端空白，rstrip清除字符串右端空白，strip清除字符串两端空白
#""与''的用法可以混淆

# Python2中，无需将打印的内容放在括号内。Python 3中 print是一个函数，括号必不可少。