import React from 'react'

const Loading = ({addClass}) => {
  return (
    <span className={`loading loading-ring loading-xs ${addClass}`}></span>
  )
}

export default Loading