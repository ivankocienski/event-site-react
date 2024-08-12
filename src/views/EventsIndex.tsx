// import { useAppDispatch } from "../data/hooks";
import { useSearchParams } from 'react-router-dom';
import { useFetchEventsQuery } from '../data/features/eventSlice';
import { mapToEventAbbr } from '../data/types';
import { useState } from 'react';

function parseDate(inputValue: any): Date|null {

  // yyyy-mm-dd
  const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

  if(typeof inputValue !== 'string') return null;

  const matches = inputValue.match(datePattern);
  if(!matches) return null;

  const dateNumber = Date.parse(inputValue);
  if(!dateNumber) return null;

  return new Date(dateNumber);
}

// returns true if date is on same day, regardless of time
function onSameDay(eventDate: Date, paramDate: Date): boolean {
  if(eventDate.getFullYear() != paramDate.getFullYear()) return false;
  if(eventDate.getMonth() != paramDate.getMonth()) return false;
  if(eventDate.getDate() != paramDate.getDate()) return false;

  return true;
}

//
// componnet
//
function getCurrentDayFromParams(): Date {
  const [ searchParams, _ ] = useSearchParams();

  return parseDate(searchParams.get("day")) || new Date();
}

type OnClickHandlerType = (event: React.MouseEvent) => void;

function EventsIndex() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ currentDay, setCurrentDay ] = useState(getCurrentDayFromParams());

  // const [ searchParams, _ ] = useSearchParams();
  // const currentDay: Date = parseDate(searchParams.get("day")) || new Date();
  const isToday = onSameDay(currentDay, new Date());

  console.log("currentDay=", currentDay);

  // const dispatch = useAppDispatch();
  const { data = [], isFetching } = useFetchEventsQuery();

  type DateMapType = Record<string, boolean>;

  function setDayFilter(dayString: string): OnClickHandlerType {
    const dateToSet = new Date(dayString);

    return (event: React.MouseEvent) => {
      event.preventDefault();
      console.log("nav link clicked: ", dateToSet);

      setSearchParams({
        day: dayString
      });

      setCurrentDay(dateToSet);
    };
  }

  function dayNavigationLinks() {
    if(isFetching || data.length == 0) return;

    const dayDates = mapToEventAbbr(data).reduce( (dateMap: DateMapType, event ): DateMapType => {
      let dateString = event.startDate.toISOString().slice(0, 10);
      if(dateString in dateMap) {
        return dateMap;
      }
      dateMap[dateString] = true;
      return dateMap;
    }, {});

    const dayLinkElement = (dateString: string, key: number): JSX.Element => {
      const dayDate = new Date(dateString);

      if(onSameDay(dayDate, currentDay)) {
        return <span key={key}>{dateString} </span>;
      }

      return (
        <span><a key={key} href='#' onClick={setDayFilter(dateString)}>{dateString}</a> </span>
      );
    }

    return (
      <div>
        <h2>{currentDay.toISOString()}</h2>

        {Object.keys(dayDates).slice(0, 7).map(dayLinkElement)}
      </div>
    );
  }

  function eventByDayViewThing() {
    if(isFetching || data.length == 0) return;

    const eventsOnDay =
      mapToEventAbbr(data)
      .filter( event => onSameDay(event.startDate, currentDay));

    return (
      <>
        <h2>{currentDay.toISOString()}</h2>

        {eventsOnDay.map( (eventOnDay, index) => <p key={index}>{eventOnDay.summary}</p>)}
      </>
    );
  }

  return (
    <>
      <h1>A EventsIndex thing</h1>
      <p>data.lenth={data.length}</p>
      <p>isFetching={isFetching ? 'Yes' : 'No'}</p>
      {!isToday && <p><a href="/events">Return to <em>Today</em></a></p>}
      {dayNavigationLinks()}
      {eventByDayViewThing()}
    </>
  )
}

export default EventsIndex;

/* return (
  <>
    <h1>A EventsIndex thing</h1>
    <p>data.lenth={data.length}</p>
    <p>isFetching={isFetching ? 'Yes' : 'No'}</p>

    {eventTable()}
  </>
) */

  // function EventsIndex() {
  //   const [ searchParams ] = useSearchParams();
  //   let currentDay: Date = parseDate(searchParams.get("day")) || new Date();

  //   // const dispatch = useAppDispatch();
  //   const { data = [], isFetching } = useFetchEventsQuery();

  //   console.log("currentDay=", currentDay);

  //   /*
  //   function eventTable() {
  //     if(isFetching || data.length == 0) return;

  //     const eventAbbrs = mapToEventAbbr(data);

  //     return (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>ID</th>
  //             <th>summary</th>
  //             <th>start date</th>
  //             <th>organiser ID</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {eventAbbrs.map( (event, index) =>
  //             <tr key={index}>
  //               <td>{event.id}</td>
  //               <td>{event.summary}</td>
  //               <td>{event.startDate.toDateString()}</td>
  //               <td>{event.organizer.id}</td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     )
  //   }

  //   if(!isFetching && data.length > 0) {
  //     const eventAbbrs = mapToEventAbbr(data);



  //     console.log(eventsByDay);
  //   }
  //   */

  //   function eventByDayViewThing() {
  //     if(isFetching || data.length == 0) return;

  //     const eventAbbrs = mapToEventAbbr(data);

  //     let eventsByDay: Record<string, any[]> = eventAbbrs.reduce(
  //       (eventByDayBlock: Record<string, any[]>, event): Record<string, any[]> => {
  //         let dateKey = event.startDate.toISOString().slice(0, 10);

  //         if(dateKey in eventByDayBlock) {
  //           eventByDayBlock[dateKey].push(event);

  //         } else {
  //           eventByDayBlock[dateKey] = [ event ];
  //         }

  //         return eventByDayBlock;
  //       },
  //       {}
  //     );
  //     let entries = [];

  //     for(const key in eventsByDay) {
  //       entries.push(
  //         <li key={key}>
  //           <h2>{key}</h2>

  //           {eventsByDay[key].map( (eventOnDay, index) => <p key={index}>{eventOnDay.summary}</p>)}
  //         </li>
  //       );
  //     }

  //     return (
  //       <ul>
  //         {entries}
  //       </ul>
  //     );
  //   }

  //   return (
  //     <>
  //       <h1>A EventsIndex thing</h1>
  //       <p>data.lenth={data.length}</p>
  //       <p>isFetching={isFetching ? 'Yes' : 'No'}</p>

  //       {eventByDayViewThing()}
  //     </>
  //   )
  // }











//   // import { useAppDispatch } from "../data/hooks";
// import { useSearchParams } from 'react-router-dom';
// import { useFetchEventsQuery } from '../data/features/eventSlice';
// import { mapToEventAbbr } from '../data/types';
// import { useState } from 'react';

// function parseDate(inputValue: any): Date|null {

//   // yyyy-mm-dd
//   const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

//   if(typeof inputValue !== 'string') return null;

//   const matches = inputValue.match(datePattern);
//   if(!matches) return null;

//   const dateNumber = Date.parse(inputValue);
//   if(!dateNumber) return null;

//   return new Date(dateNumber);
// }

// // returns true if date is on same day, regardless of time
// function onSameDay(eventDate: Date, paramDate: Date): boolean {
//   if(eventDate.getFullYear() != paramDate.getFullYear()) return false;
//   if(eventDate.getMonth() != paramDate.getMonth()) return false;
//   if(eventDate.getDate() != paramDate.getDate()) return false;

//   return true;
// }

// //
// // componnet
// //
// function getCurrentDayFromParams(): Date {
//   const [ searchParams, _ ] = useSearchParams();

//   return parseDate(searchParams.get("day")) || new Date();
// }

// function EventsIndex() {
//   const [ currentDay, setCurrentDay ] = useState(getCurrentDayFromParams());

//   // const [ searchParams, _ ] = useSearchParams();
//   // const currentDay: Date = parseDate(searchParams.get("day")) || new Date();
//   const isToday = onSameDay(currentDay, new Date());

//   console.log("currentDay=", currentDay);

//   // const dispatch = useAppDispatch();
//   const { data = [], isFetching } = useFetchEventsQuery();

//   type DateMapType = Record<string, boolean>;

//   function dayNavigationLinks() {
//     if(isFetching || data.length == 0) return;

//     const dayDates = mapToEventAbbr(data).reduce( (dateMap: DateMapType, event ): DateMapType => {
//       let dateString = event.startDate.toISOString().slice(0, 10);
//       if(dateString in dateMap) {
//         return dateMap;
//       }
//       dateMap[dateString] = true;
//       return dateMap;
//     }, {});


//     return (
//       <div>
//         <h2>{currentDay.toISOString()}</h2>

//         {Object.keys(dayDates).slice(0, 7).map( dateString => <span><a href={`/events?day=${dateString}`}>{dateString}</a> </span>)}
//       </div>
//     );
//   }

//   function eventByDayViewThing() {
//     if(isFetching || data.length == 0) return;

//     const eventsOnDay =
//       mapToEventAbbr(data)
//       .filter( event => onSameDay(event.startDate, currentDay));

//     return (
//       <>
//         <h2>{currentDay.toISOString()}</h2>

//         {eventsOnDay.map( (eventOnDay, index) => <p key={index}>{eventOnDay.summary}</p>)}
//       </>
//     );
//   }

//   return (
//     <>
//       <h1>A EventsIndex thing</h1>
//       <p>data.lenth={data.length}</p>
//       <p>isFetching={isFetching ? 'Yes' : 'No'}</p>
//       {!isToday && <p><a href="/events">Return to <em>Today</em></a></p>}
//       {dayNavigationLinks()}
//       {eventByDayViewThing()}
//     </>
//   )
// }

// export default EventsIndex;