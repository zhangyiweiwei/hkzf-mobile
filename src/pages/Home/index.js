import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Index from './Index/index'
import My from './My'
import News from './News'
import House from './House'
import { TabBar } from 'antd-mobile'
import './index.scss'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 默认选中
      selectedTab: 'blueTab',
      // 是否显示下面的导航
      hidden: false,
      // 是否展示全屏
      fullScreen: true
    }
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center'
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9'
          }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="home">
        {/* 配置嵌套路由 */}
        <Route path="/home/index" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        <div
          style={
            this.state.fullScreen
              ? { position: 'fixed', height: '100%', width: '100%', top: 0 }
              : { height: 400 }
          }
        >
          <TabBar
            // 没被选中的下面字体的颜色
            unselectedTintColor="red"
            // 选中字体的下面的颜色
            tintColor="green"
            // tabBar的背景颜色
            barTintColor="#000"
            // 控制 tabBar的显示与隐藏
            hidden={this.state.hidden}
          >
            {/* 
              icon：// 未选中的时候展示的图标 
              selectIcon： 选中的时候展示的图标
              badge: 徽章 可以显示选中多少
              onPress: 点击的事件 可以保证在点击的时候被选中
            */}
            <TabBar.Item
              title="首页"
              // 因为 title 本身就是唯一的 所以 key  可以使用 title
              key="首页"
              icon={<i className="iconfont icon-ind" />}
              selectedIcon={<i className="iconfont icon-ind" />}
              selected={this.state.selectedTab === 'blueTab'}
              badge={77}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab'
                })
              }}
              data-seed="logId"
            />
            <TabBar.Item
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              title="找房"
              key="找房"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab'
                })
              }}
              data-seed="logId1"
            />
            <TabBar.Item
              icon={<i className="iconfont icon-infom" />}
              selectedIcon={<i className="iconfont icon-infom" />}
              title="资讯"
              key="资讯"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab'
                })
              }}
            />
            <TabBar.Item
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              title="我的"
              key="我的"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab'
                })
              }}
            />
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
