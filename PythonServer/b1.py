#coding:utf-8
#1、最简单
print ("hello world")

#2、简单变量
qr = "hi"
print(qr)

#3、变量可以随时修改，始终记录最新值
qr = "AncOnada"
print(qr)

#4、规则：变量名只能包含字母、数字和下划线。变量名可以字母或下划线打头，但不能以数字打头
#不要将Python关键字和函数名用作变量名
#be careful of 1\0 、 l\O
#避免使用大写

#方法，对字符串操作（大小写）
#后面的句点(.)让Python对变量qr执行方法title()指定的操作
#每个方法后面都跟着一对括号， 这是因为方法通常需要额外的信息来完成其工作。这种信息是在括号内提供的
print(qr.title())
print(qr.upper())
print qr.lower()

cr = qr.upper()
print(cr)

#字符串拼接
full_name = qr+" "+cr.lower()
print (full_name)
cqr = "Hello, " + full_name.title() + "!"
print (cqr)