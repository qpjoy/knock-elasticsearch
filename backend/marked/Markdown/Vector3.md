# 三维向量
## 类型: Vector3
### 简介
<!-- START Desc -->
三维向量。
<!-- END Desc -->

# 构造函数

[Vector3](Vector3/Constructor/Vector3.md)([float](float.md) X,[float](float.md) Y,[float](float.md) Z)
<!-- START Generated from class json -->
构建一个三维向量。
<!-- END Generated from class json -->

# 静态属性

[Vector3](Vector3.md) [Back](Vector3/StaticProperty/Back.md)
<!-- START Generated from class json -->
向后的单位向量,即Vector3(0,0,-1)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Down](Vector3/StaticProperty/Down.md)
<!-- START Generated from class json -->
向下的单位向量,即Vector3(0,-1,0)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Forward](Vector3/StaticProperty/Forward.md)
<!-- START Generated from class json -->
向前的单位向量,即Vector3(0,0,1)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Left](Vector3/StaticProperty/Left.md)
<!-- START Generated from class json -->
向左的单位向量,即Vector3(-1,0,0)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [One](Vector3/StaticProperty/One.md)
<!-- START Generated from class json -->
即Vector3(1,1,1)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Right](Vector3/StaticProperty/Right.md)
<!-- START Generated from class json -->
向右的单位向量,即Vector3(1,0,0)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Up](Vector3/StaticProperty/Up.md)
<!-- START Generated from class json -->
向上的单位向量,即Vector3(0,1,0)。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Zero](Vector3/StaticProperty/Zero.md)
<!-- START Generated from class json -->
零向量，即Vector3(0,0,0)。
<!-- END Generated from class json -->

# 属性

[float](float.md) [X](Vector3/Property/X.md)
<!-- START Generated from class json -->
向量的X值。
<!-- END Generated from class json -->


[float](float.md) [Y](Vector3/Property/Y.md)
<!-- START Generated from class json -->
向量的Y值。
<!-- END Generated from class json -->


[float](float.md) [Z](Vector3/Property/Z.md)
<!-- START Generated from class json -->
向量的Z值。
<!-- END Generated from class json -->


[float](float.md) [x](Vector3/Property/x.md)
<!-- START Generated from class json -->
向量的X值。
<!-- END Generated from class json -->


[float](float.md) [y](Vector3/Property/y.md)
<!-- START Generated from class json -->
向量的Y值。
<!-- END Generated from class json -->


[float](float.md) [z](Vector3/Property/z.md)
<!-- START Generated from class json -->
向量的Z值。
<!-- END Generated from class json -->


[float](float.md) [Magnitude](Vector3/Property/Magnitude.md)
<!-- START Generated from class json -->
向量的长度。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Normalized](Vector3/Property/Normalized.md)
<!-- START Generated from class json -->
把向量归一化，使其方向不变，长度变为1。
<!-- END Generated from class json -->


[float](float.md) [SqrMagnitude](Vector3/Property/SqrMagnitude.md)
<!-- START Generated from class json -->
向量长度的平方。
<!-- END Generated from class json -->

# 静态函数

[float](float.md) [Angle](Vector3/StaticFunction/Angle.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
计算两个向量之间的夹角。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [ClampMagnitude](Vector3/StaticFunction/ClampMagnitude.md)([Vector3](Vector3.md) vector,[float](float.md) maxDistance)
<!-- START Generated from class json -->
返回一个向量，使其长度不超过最大长度。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Cross](Vector3/StaticFunction/Cross.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
两个向量的叉乘积。
<!-- END Generated from class json -->


[float](float.md) [Dot](Vector3/StaticFunction/Dot.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
两个向量的点乘积。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Lerp](Vector3/StaticFunction/Lerp.md)([Vector3](Vector3.md) start,[Vector3](Vector3.md) target,[float](float.md) alpha)
<!-- START Generated from class json -->
两个向量之间的线性插值。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Project](Vector3/StaticFunction/Project.md)([Vector3](Vector3.md) vector,[Vector3](Vector3.md) axis)
<!-- START Generated from class json -->
返回一个向量在指定轴上的投影。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Slerp](Vector3/StaticFunction/Slerp.md)([Vector3](Vector3.md) start,[Vector3](Vector3.md) target,[float](float.md) alpha)
<!-- START Generated from class json -->
两个向量之间的弧形插值。
<!-- END Generated from class json -->

# 函数

[float](float.md) [Angle](Vector3/Function/Angle.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
计算两个向量之间的夹角。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Cross](Vector3/Function/Cross.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
两个向量的叉乘积。
<!-- END Generated from class json -->


[float](float.md) [Dot](Vector3/Function/Dot.md)([Vector3](Vector3.md) vec1,[Vector3](Vector3.md) vec2)
<!-- START Generated from class json -->
两个向量的点乘积。
<!-- END Generated from class json -->


[bool](bool.md) [Equals](Vector3/Function/Equals.md)([Object](Object.md) obj)
<!-- START Generated from class json -->
判定该向量是否与某个对象相等。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Lerp](Vector3/Function/Lerp.md)([Vector3](Vector3.md) target,[float](float.md) alpha)
<!-- START Generated from class json -->
两个向量之间的线性插值。
<!-- END Generated from class json -->


void [Normalize](Vector3/Function/Normalize.md)()
<!-- START Generated from class json -->
把向量归一化，使其方向不变，长度变为1。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Project](Vector3/Function/Project.md)([Vector3](Vector3.md) axis)
<!-- START Generated from class json -->
返回一个向量在指定轴上的投影。
<!-- END Generated from class json -->


[Vector3](Vector3.md) [Rotate](Vector3/Function/Rotate.md)([Vector3](Vector3.md) axis,[float](float.md) angle)
<!-- START Generated from class json -->
将一个向量沿某条轴旋转某个角度。
<!-- END Generated from class json -->


void [Set](Vector3/Function/Set.md)([float](float.md) X,[float](float.md) Y,[float](float.md) Z)
<!-- START Generated from class json -->
将一个向量的X、Y与Z分别设为指定值。
<!-- END Generated from class json -->]

测试tag
