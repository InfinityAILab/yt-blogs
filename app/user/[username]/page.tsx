import React from "react"

export default function page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-40 bg-black"></div>
      <div className="max-w-7xl bg-gray-50 rounded-e-lg h-80 mx-auto -mt-20">
        <div className="h-20 w-20 bg-gray-500 rounded-full mx-auto -mt-20 "></div>
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto gap-4">
          <h3 className="text-3xl font-bold">Chris Bongers</h3>
          <h5 className="text-center">
            Looking to get into development? As a full-stack developer I guide
            you on this journey and give you bite sized tips every single day 👊
          </h5>
          <span>Joined on Apr 20, 2020</span>
        </div>
      </div>
    </div>
  )
}
