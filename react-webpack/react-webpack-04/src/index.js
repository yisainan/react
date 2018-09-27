import React from 'react'
import ReactDom from 'react-dom'

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom'

import loaderHome from 'bundle-loader?lazy&name=home!./pages/Home'
import loaderNews from 'bundle-loader?lazy&name=news!./pages/News'
import loaderCourse from 'bundle-loader?lazy&name=course!./pages/Course'
import loaderJoinUs from 'bundle-loader?lazy&name=joinUs!./pages/JoinUs'
import loaderLogin from 'bundle-loader?lazy&name=joinUs!./pages/Login'
import Bundle from './components/Bundle'


const Home = (props) => (
  <Bundle load={loaderHome}>
    {(Home) => <Home {...props}/>}
  </Bundle>
)


const News = (props) => (
  <Bundle load={loaderNews}>
    {(News) => <News {...props}/>}
  </Bundle>
)

const Course = (props) => (
  <Bundle load={loaderCourse}>
    {(Course) => <Course {...props}/>}
  </Bundle>
)

const JoinUs = (props) => (
  <Bundle load={loaderJoinUs}>
    {(JoinUs) => <JoinUs {...props}/>}
  </Bundle>
)

const Login = (props) => (
  <Bundle load={loaderLogin}>
    {(Login) => <Login {...props}/>}
  </Bundle>
)


const App = () => (
	<Router>
		<Switch>
		
			<Route exact path="/" component={Home}/>
			<Route path="/login" component={Login}/>
			<Route path="/news" component={News}/>
			<Route path="/course" component={Course}/>
			<Route path="/joinUs" component={JoinUs}/>
			<Route path="/error" render={(props) => <div><h1>404 Not Found!</h1></div>}/>
			<Route path="*" render={(props) => <Redirect to='/error'/>}/>
		</Switch>
	</Router>
)

if (module.hot) {
	module.hot.accept(() => {
		ReactDom.render(
			<App />,
			document.getElementById('root')
		)
	})
}



ReactDom.render(
	<App />,
	document.getElementById('root')
)