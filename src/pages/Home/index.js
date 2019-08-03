import React from 'react'
import { Route } from 'react-router-dom'
import Index from './Index/index'
import My from './My'
import News from './News'
import House from './House'
import { TabBar } from 'antd-mobile'
import './index.scss'

const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]

class Home extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      // 默认选中
      selectedTab: props.location.pathname
      // 是否显示下面的导航
      // hidden: false
      // 是否展示全屏
      // fullScreen: true
    }
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps)
    // console.log(this.props)
    // 更新阶段调用 setState ， 需要给判断条件 佛则就会进入死循环
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  // 封装TabBar.Item
  renderItem() {
    return itemList.map(item => (
      <TabBar.Item
        title={item.title}
        // 因为 title 本身就是唯一的 所以 key  可以使用 title
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          // 不需要了 只要路由改变了 就会 触发 componentDidUpdate() 这个钩子函数，可以省略
          // this.setState({
          //   selectedTab: item.path
          // })
          this.props.history.push(item.path)
        }}
      />
    ))
  }

  render() {
    return (
      <div className="home">
        {/* 配置嵌套路由 */}

        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        <div className="tabBar">
          <TabBar
            // 没被选中的下面字体的颜色
            unselectedTintColor="#888"
            // 选中字体的下面的颜色
            tintColor="#21b97a"
            // tabBar的背景颜色
            barTintColor="#000"
            // 控制 tabBar的显示与隐藏
            // hidden={this.state.hidden}
            noRenderContent={true}
          >
            {/* 
              icon：// 未选中的时候展示的图标 
              selectIcon： 选中的时候展示的图标
              badge: 徽章 可以显示选中多少
              onPress: 点击的事件 可以保证在点击的时候被选中
            */}
            {this.renderItem()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
