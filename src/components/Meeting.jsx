import React from 'react'
import {  IoIosMore } from "react-icons/io";

import { Menu, Transition } from "@headlessui/react";
import {
  // add,
  // eachDayOfInterval,
  // endOfMonth,
  format,
  // getDay,
  // isEqual,
  // isSameDay,
  // isSameMonth,
  // isToday,
  // parse,
  parseISO,

} from "date-fns";
import { Fragment } from "react";


// Meeting Component--- Available list of customers that has booked a barber 

const Meeting = ({meeting}) => {
    let startDateTime = parseISO(meeting.startDatetime);
    let endDateTime = parseISO(meeting.endDatetime);

    return (
      <li className='flex items-center py-2  group w-full'>
        <div className='flex-auto '>
         {meeting.availableTime.map((time, index) => {
          return (

              <span key={index} className="bg-primaryDark rounded-md p-2 inline-block mr-4 cursor-pointer text-white">
                {time}
              </span>
           
          )
         })}
        </div>
     
      </li>
    );
}

export default Meeting

