"use client"
import waitlist from '@zootools/waitlist-js'
import { useEffect } from 'react'


const WaitList = ({userId} : {userId: Number | null}) => {

  useEffect(() => {
    if(!userId){
      waitlist.openPopup("mt68iuzeoHEV09BHkayS")
    }
  }, [])

  return <></>;
};

export default WaitList