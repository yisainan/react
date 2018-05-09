/**
 * Created by xfzhang on 2016/12/25.
 */
import React from 'react'
export default function ({params}) {
  let {username, repoName} = params
  return (
    <div>用户名:{username}, 仓库名:{repoName}</div>
  )
}