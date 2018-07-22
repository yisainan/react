import React from 'react'
import {Link} from 'react-router'
export default function NavLink(props) {
  return <Link {...props} activeClassName="active"/>
}