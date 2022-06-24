import React from 'react'
import { MdStickyNote2 } from 'react-icons/md'
import PadContainer from './PadContainer'

const MainContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="pt-2 pb-8 flex-1 flex flex-col items-start md:items-center justify-center drop-shadow-xl">
        <div className="flex items-center justify-center gap-2 bg-orange-100 p-4 rounded-full">
          <p className="text-2xl text-orange-500 font-semibold">THIS WEEK</p>
          <MdStickyNote2 className="w-8 h-8 bg-white text-black rounded-full overflow-hidden drop-shadow-xl"/>
        </div>
      </div>


      <div className="flex-1 bg-orange-400 rounded-md mb-10">
        <PadContainer></PadContainer>
      </div>




    </div>
  )
}

export default MainContainer