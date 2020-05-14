# 注意事项

- html-webpack-plugin

- clean-webpack-plugin

开闭原则 系统中的类,对拓展开放,对修改关闭

## 类组

- 方块类 : Square ( IView, Point, color )
  保存基本方块单元的绝对位置,颜色以及展示者基本信息
- 方块组类: SquareGroup ( Square[], Shape, centerPoint, color )
  负责计算方块组中各个方块的绝对位置以及旋转
- 方块展示类: SquarePageView ( isremove, dom, Square, container )
  负责给传入的方块组进行样式设置以及添加到对应的页面节点中,还可以消除页面节点中的方块组
- 游戏展示类 GamePageViewer(SquareGroup)
  负责将传入的方块组进行展示以及切换

- 游戏类: Game(GameViewer)
  声明各种控制函数(向左,向右,暂停,开始等),产生下一个 SquareGroup,同时使用 reset 函数对其位置进行调整,保证其不超出边界,调用 showNext 函数去将方块渲染出来,

## 调用过程

新建 Game 类 --》Game 类传入 showNext 和 switch 方法

1. Game 类使用 createTeris 初始化一个方块组类 SquareGroup
2. 方块组初始化过程中新建好 Square 同时设置好每个方块组的绝对位置
3. show 方法会将小方块设置好对应的样式并添加到页面中
4. 在 Game 类的构造函数中，会通过调用 reset 方法来调整方块的位置，然后调用 showNext 方法给每个小方块设置好 Ivewer 类，同时调用 show 方法，将小方块添加到容器中。
5. 然后我们调用Game类的start方法,start方法先设置好游戏状态,同时一次调用switchTeris和autoToDown方法
6. switchTeris方法
