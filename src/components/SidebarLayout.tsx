import React from 'react'

const SidebarLayout = ({children}:any) => {
  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">{children}</div>
  )
}

export default SidebarLayout