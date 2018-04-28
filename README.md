# MultilineText.js
React-Native 多行文本展示的JS前端js组件（超出限制行数显示”...更多“按钮）

### 使用方法,如下
```
import MutiRowText from '../../components/MutiRowText'

<MutiRowText
    numberOfLines={2}  //最多显示多少行
    onReady={()=>{
        console.log('点击了“全文”或“收起”')
    } //点击的回调函数
>
    <Text style={{
        fontSize: 14, color: 'blue', lineHeight: 21,
    }}>{text content}</Text>
    
</MutiRowText>
                        
```
#### 更多具体情况自行修改展示样式

```
- state在constructor方法里写

...
constructor(props) {
    this.state = {
        n: ...
    }
}


- 写default props有两种方法

//1 在组件内部的使用static
...
static defaultProps = {
    name:　...
}


//2 在组件外部

Hello.defaultProps = {
    name: ...
}

```
