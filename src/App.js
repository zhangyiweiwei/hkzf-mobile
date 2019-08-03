import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import City from './pages/City'
import NotFound from './pages/NotFound'

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <div className="app">App组件</div> */}
        {/* <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <Link to="/city">城市</Link>
          </li>
          <li>
            <Link to="/map">地图</Link>
          </li>
        </ul> */}
        {/* <button type="permi">我是按钮</button> */}
        {/* 配置路由规则 */}
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/city" component={City} />
          <Route path="/map" component={Map} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
