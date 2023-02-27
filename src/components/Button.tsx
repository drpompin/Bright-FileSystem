import React from 'react'

interface ButtonProps {
    style?: React.CSSProperties
    onClick: React.MouseEventHandler<HTMLInputElement>
    children?: React.ReactNode
    // any props that come into the component
}

export default function Button({ style, onClick, children }: ButtonProps): JSX.Element {
  return (
    <div style={style} onClick={onClick}>{children}</div>
  )
}
