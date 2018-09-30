/**
 * 关于组件
 */
import React from 'react'
import NavLink from './NavLink'
export default class Repos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: [
        {username: 'faceback', repoName: 'react'},
        {username: 'faceback', repoName: 'react-router'},
        {username: 'Angular', repoName: 'angular'},
        {username: 'Angular', repoName: 'angular-cli'}
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {

    const repos = this.state.repos
    repos.push({
      username: this.refs.username.value,
      repoName: this.refs.repoName.value
    })
    this.setState({repos})
    this.refs.username.value = ''
    this.refs.repoName.value = ''
  }

  render() {
    return (
      <div>
        <h2>Repos</h2>
        <ul>
          {
            this.state.repos.map((repo, index) => {
              const to = `/repos/${repo.username}/${repo.repoName}`

              return (
                <li key={index}>
                  <NavLink to={to}>{repo.repoName}</NavLink>
                </li>
              )
            })
          }
          <li>
            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="用户名" ref='username'/> / {' '}
              <input type="text" placeholder="仓库名" ref='repoName'/>{' '}
              <button type="submit">添加</button>
            </form>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
