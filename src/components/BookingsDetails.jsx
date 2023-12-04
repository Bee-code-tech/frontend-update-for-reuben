import Meeting from "./Meeting";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom"
import {
  QuestionMarkCircleIcon
} from "@heroicons/react/20/solid";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-11T13:00",
    endDatetime: "2023-12-11T14:30",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"],
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-20T09:00",
    endDatetime: "2023-12-20T11:30",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"],
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-13T14:00",
    endDatetime: "2023-12-13T18:00",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"],
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-09T13:00",
    endDatetime: "2023-12-09T14:30",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"],
  },
  {
    id: 9,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-09T13:00",
    endDatetime: "2023-12-09T14:30",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"],
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-13T14:00",
    endDatetime: "2023-12-13T14:30",
    availableTime: ["9:00 am", "8:00 am", "10: 00 am"]
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import React from 'react'

const BookingsDetails = () => {
    let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  return (
    <div className='pt-16'>
      <div className='max-w-md mb-8  mx-auto sm:px-7 md:max-w-4xl md:px-6'>
        <div className='md:grid md:grid-cols-2 md:divide-x md:divide-gray-200'>
          <div className='md:pr-14'>
            <div className='flex items-center'>
              <h2 className='flex-auto font-semibold text-gray-900'>
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type='button'
                onClick={previousMonth}
                className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Previous month</span>
                <IoIosArrowBack className='w-5 h-5' aria-hidden='true' />
              </button>
              <button
                onClick={nextMonth}
                type='button'
                className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>Next month</span>
                <IoIosArrowForward className='w-5 h-5' aria-hidden='true' />
              </button>
            </div>
            <div className='grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500'>
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className='grid grid-cols-7 mt-2 text-sm'>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}>
                  <button
                    type='button'
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-black",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-primaryDark",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-primaryDark",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}>
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className='w-1 h-1 mx-auto mt-1'>
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className='w-1 h-1 rounded-full bg-sky-500'></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className='mt-12 md:mt-0 md:pl-14'>
            <h2 className='font-semibold text-gray-900'>
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className='mt-2 space-y-1 text-sm leading-6 text-gray-500'>
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p></p>
              )}
            </ol>
          </section>
        </div>
      </div>
        {/* order summary  */}
        <section
          aria-labelledby='summary-heading'
          className='mt-26 rounded-lg w-1/2 mx-auto bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
          <h2
            id='summary-heading'
            className='text-lg font-medium text-gray-900'>
            Order summary
          </h2>

          <dl className='mt-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <dt className='text-sm text-gray-600'>Booking</dt>
              <dd className='text-sm font-medium text-gray-900'>$500</dd>
            </div>
            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <dt className='flex items-center text-sm text-gray-600'>
                <span>Booking Hour</span>
              </dt>
              <dd className='text-sm font-medium text-gray-900'>
                <span className='bg-primaryDark rounded-md px-4 py-2 inline-block mr-4 cursor-pointer text-white'>
                  9:00 am
                </span>
              </dd>
            </div>

            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <dt className='text-base font-medium text-gray-900'>
                Order total
              </dt>
              <dd className='text-base font-medium text-gray-900'>$500</dd>
            </div>
          </dl>

          <div className='mt-6'>
           <Link to='/success'>
            <button
              type='submit'
              className='w-full rounded-md border border-transparent bg-primaryDark py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primaryColor focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2 focus:ring-offset-gray-50'>
             Book
            </button>
           </Link>
          </div>
        </section>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
export default BookingsDetails




