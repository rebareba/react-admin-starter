import React from 'react'

const ContentLayout = ({children, className}) => (
  <div className={`${className || ''} content-layout-wrapper`}>{children}</div>
)

const Header = ({children}) => <div className="content-layout-header">{children}</div>

const Content = ({children, className}) => (
  <div className="content-layout-content">
    <div className={`${className || ''} content-inner`}>{children}</div>
  </div>
)

const Footer = ({children}) => <div className="content-layout-footer">{children}</div>

ContentLayout.Header = Header
ContentLayout.Content = Content
ContentLayout.Footer = Footer

export default ContentLayout
