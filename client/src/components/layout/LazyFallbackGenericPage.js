import React from 'react'
import './navBar/nav.css'

export const LazyFallbackGenericPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <div className="nav" />
      <div className="page-frame" />
    </div>
  )
}
