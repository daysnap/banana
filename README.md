# @daysnap/banana

表单校验、辅助方法


## 安装

```shell
npm install @daysnap/banana

# or
yarn add @daysnap/banana
```


## 例子

```ts
import banana from '@daysnap/banana'

const form = {
  name: '张三',
  age: 18,
  sex: 1,
}

const formRule = {
  name: [
    { required: true, messages: '请填写姓名' },
  ],
  age: [
    { required: true, messages: '请填写年龄' },
    { validator: /^\d$/, messages: '年龄输入有误' },
    (value) => {
      if (value < 0) {
        throw new Error('年龄不能为负数')
      }
    },
  ],
}

banana.validate(form, formRule)
```

```ts
import banana from '@daysnap/banana'

const form = {
  name: {
    value: '',

  }
}
```
