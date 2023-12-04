import { Fragment, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
    CalendarIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'
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
import { Menu, Transition } from '@headlessui/react'

const meetings = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    {
        id: 2,
        date: 'January 15th, 2022',
        time: '3:30 PM',
        datetime: '2022-01-15T15:30',
        name: 'Ryan Davis',
        imageUrl:
            'https://randomuser.me/api/portraits/men/10.jpg',
        location: 'Conference Room B',
    },
    {
        id: 3,
        date: 'February 5th, 2022',
        time: '10:00 AM',
        datetime: '2022-02-05T10:00',
        name: 'Emma Williams',
        imageUrl:
            'https://randomuser.me/api/portraits/women/9.jpg',
        location: 'Zoom Meeting',
    },
    {
        id: 4,
        date: 'February 20th, 2022',
        time: '1:45 PM',
        datetime: '2022-02-20T13:45',
        name: 'David Johnson',
        imageUrl:
            'https://randomuser.me/api/portraits/men/11.jpg',
        location: 'Coffee Bean',
    },
    {
        id: 5,
        date: 'March 8th, 2022',
        time: '9:30 AM',
        datetime: '2022-03-08T09:30',
        name: 'Olivia Brown',
        imageUrl:
            'https://randomuser.me/api/portraits/women/10.jpg',
        location: 'Office Lobby',
    },
    {
        id: 6,
        date: 'March 25th, 2022',
        time: '4:15 PM',
        datetime: '2022-03-25T16:15',
        name: 'Michael Taylor',
        imageUrl:
            'https://randomuser.me/api/portraits/men/12.jpg',
        location: 'Panera Bread',
    },
    {
        id: 7,
        date: 'April 12th, 2022',
        time: '2:00 PM',
        datetime: '2022-04-12T14:00',
        name: 'Sophia Davis',
        imageUrl:
            'https://randomuser.me/api/portraits/women/11.jpg',
        location: 'Room 203',
    },
    {
        id: 8,
        date: 'April 30th, 2022',
        time: '11:30 AM',
        datetime: '2022-04-30T11:30',
        name: 'Ethan Martinez',
        imageUrl:
            'https://randomuser.me/api/portraits/men/13.jpg',
        location: 'Virtual Meeting',
    },
    {
        id: 9,
        date: 'May 18th, 2022',
        time: '6:45 PM',
        datetime: '2022-05-18T18:45',
        name: 'Ava Anderson',
        imageUrl:
            'https://randomuser.me/api/portraits/women/12.jpg',
        location: 'Cafeteria',
    },
    {
        id: 10,
        date: 'May 30th, 2022',
        time: '3:15 PM',
        datetime: '2022-05-30T15:15',
        name: 'Liam Wilson',
        imageUrl:
            'https://randomuser.me/api/portraits/men/14.jpg',
        location: 'Zoom Meeting',
    },
]
const meetingsList = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-11T13:00",
    endDatetime: "2023-12-11T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-20T09:00",
    endDatetime: "2023-12-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-13T14:00",
    endDatetime: "2023-12-13T18:00",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-09T13:00",
    endDatetime: "2023-12-09T14:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-09T13:00",
    endDatetime: "2023-12-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-12-13T14:00",
    endDatetime: "2023-12-13T14:30",
  },
];

const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]


import { classNames } from '../utils'

export default function () {

  


        let today = startOfToday();
        let [selectedDay, setSelectedDay] = useState(today);
        let [currentMonth, setCurrentMonth] = useState(
          format(today, "MMM-yyyy")
        );
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
      <div className='mx-auto max-w-lg py-8 px-6 lg:max-w-4xl xl:max-w-6xl'>
        <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
          {/* calender  */}
          <div className='md:pr-2 lg:col-span-5 xl:col-span-5 '>
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
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-primaryDark",
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
          {/* list of barber appointments  */}

          <ol className='mt-2 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-7'>
            <h2 className='text-lg font-semibold text-gray-900 mb-8'>
              Upcoming appointments
            </h2>
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className='relative flex space-x-6 py-6 xl:static'>
                <img
                  src={meeting.imageUrl}
                  alt=''
                  className='h-14 w-14 flex-none rounded-full'
                />
                <div className='flex-auto'>
                  <h3 className='pr-10 font-semibold text-gray-900 xl:pr-0'>
                    {meeting.name}
                  </h3>
                  <dl className='mt-2 flex flex-col text-gray-500 xl:flex-row'>
                    <div className='flex items-start space-x-3'>
                      <dt className='mt-0.5'>
                        <span className='sr-only'>Date</span>
                        <CalendarIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </dt>
                      <dd>
                        <time dateTime={meeting.datetime}>
                          {meeting.date} at {meeting.time}
                        </time>
                      </dd>
                    </div>
                    <div className='mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5'>
                      <dt className='mt-0.5'>
                        <span className='sr-only'>Location</span>
                        <MapPinIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </dt>
                      <dd>{meeting.location}</dd>
                    </div>
                  </dl>
                </div>
                <Menu
                  as='div'
                  className='absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center'>
                  <div>
                    <Menu.Button className='-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600'>
                      <span className='sr-only'>Open options</span>
                      <EllipsisHorizontalIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}>
                              Edit
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}>
                              Cancel
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
}
  // Col styling for starting days in the calender 
    let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export const NotificationList = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, sender: 'John Doe', message: 'Hello! How are you?', read: false },
        { id: 2, sender: 'Jane Smith', message: 'Meeting at 3 PM', read: true },
        { id: 3, sender: 'Sam Brown', message: 'Don\'t forget to submit the report.', read: false },
    ]);

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }));
        setNotifications(updatedNotifications);
    };

    return (
        <div className="p-8">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded float-right mb-4"
                onClick={markAllAsRead}
            >
                Mark All as Read
            </button>

            <ul className="list-none">
                {notifications.map(notification => (
                    <li key={notification.id} className={notification.read ? 'mb-4' : 'mb-4 font-bold'}>
                        <span className="text-lg">{notification.sender}: </span>
                        <span>{notification.message.length > 30 ? notification.message.slice(0, 30) + '...' : notification.message}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};