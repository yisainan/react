import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Home from './pages/Home'


if (module.hot) {
	module.hot.accept(() => {
		ReactDom.render(
			<AppContainer>
				<Home />
			</AppContainer>,
			document.getElementById('root')
		)
	})
}

ReactDom.render(
	<AppContainer>
		<Home />
	</AppContainer>,
	document.getElementById('root')
)