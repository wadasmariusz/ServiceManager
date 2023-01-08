import React, { useEffect, useState } from 'react'

type ToggleProps = {
  label: string
  onClick: (val: boolean) => void
  initVal?: boolean
}

const Toggle: React.FC<ToggleProps> = ({ label, onClick, initVal }) => {
  const [toggle, setToggle] = useState<boolean>(!!initVal)
  useEffect(() => {
    setToggle(!!initVal)
  }, [initVal])
  return (
    <div className={'flex items-center space-x-4'}>
      <div
        className={`flex h-5 w-10 items-center transition md:h-5 md:w-12 ${
          !toggle ? 'bg-[#BEBEBE]' : 'bg-[#1E90FF]'
        } cursor-pointer rounded-full p-1`}
        onClick={() => {
          onClick(!toggle)
          setToggle(!toggle)
        }}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white shadow-md duration-300 ease-in-out md:h-4 md:w-4${
            !toggle ? '' : 'translate-x-6'
          }`}
        />
      </div>
      {label && <p>{label}</p>}
    </div>
  )
}

export default Toggle
