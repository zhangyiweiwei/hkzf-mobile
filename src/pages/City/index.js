import React from 'react'
import { NavBar } from 'antd-mobile'
import axios from 'axios'
import './index.scss'

class City extends React.Component {
  state = {
    cityList: []
  }

  componentDidMount() {
    this.getCitys()
  }

  formatDate(list) {
    console.log(list)
    const cityObj = {}

    // 数据进行处理
    // 1. 遍历list 得到每一个城市
    // 2. 获取到城市的short 首字母
    // 3. 判断short的首字母是否在对象中 cityObj
    // 4. 如果对象中没有这个首字母， 给对象添加这个属性 值 cityObj['a'] = [{城市}]
    // 5. 如果对象中已经有了这个首字母， 只需要往里面push 就行

    list.forEach(item => {
      // 截取short 属性 可以得到首字母 即key 属性
      const key = item.short.slice(0, 1)
      // console.log(key)
      // 判断 key 在cityObj 中是否存在，
      if (key in cityObj) {
        cityObj[key].push(item)
      } else {
        // 以数组的形式传入
        cityObj[key] = [item]
      }
    })

    const shortList = Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }
  }

  async getCitys() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      const { cityObj, shortList } = this.formatDate(body)
      //   添加热门城市 这边因为数据已经在 formatDate 中处理过了 因此需要在这个后面添加请求
      const resHot = await axios.get('http://localhost:8080/area/hot')
      console.log(resHot.data)
      if (resHot.data.status === 200) {
        shortList.unshift('hot')
        cityObj.hot = resHot.data.body

        cityObj['#'] = []
      }
      console.log(cityObj, shortList)
    }
  }

  render() {
    return (
      <div className="city">
        {/* 顶部导航栏 */}
        <NavBar
          className="navbar"
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
          // rightContent={[
          //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          //   <Icon key="1" type="ellipsis" />
          // ]}
        >
          城市导航
        </NavBar>
        {/* 城市列表 */}
      </div>
    )
  }
}

export default City
