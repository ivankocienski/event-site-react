// import { useAppDispatch } from "../data/hooks";
import { useSearchParams } from 'react-router-dom';
import { useFetchEventsQuery } from '../data/features/eventSlice';
import { mapToEventAbbr } from '../data/types';
import { useState } from 'react';
import strfime from 'strftime';
import './EventsIndex.scss';
import calendarIconSVG from '../assets/calendar-icon.svg';

function formatDate(date: Date): string {
  return strfime('%d %B, %Y', date);
}

function formatTime(date: Date): string {
  return strfime('%H:%M', date);
}

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

type OnClickHandlerType = (event: React.MouseEvent) => void;
type DateMapType = Record<string, boolean>;

function EventsIndex() {
  const [ searchParams, setSearchParams ]
    = useSearchParams();

  const [ currentDay, setCurrentDay ]
    = useState(parseDate(searchParams.get("day")) || new Date());

  const isToday
    = onSameDay(currentDay, new Date());

  const { data = [], isFetching }
    = useFetchEventsQuery();

  const setDayFilter = (dayString: string): OnClickHandlerType => {
    const dateToSet = new Date(dayString);

    return (event: React.MouseEvent) => {
      event.preventDefault();
      console.log("nav link clicked: ", dateToSet);

      setSearchParams({
        day: dayString
      });  /* , { replace: true } ); */

      setCurrentDay(dateToSet);
    };
  }

  const dayNavigationLinks = () => {
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
        return <span className='nav' key={key}>{dateString}</span>;
      }

      return (
        <a className='nav' key={key} href='#' onClick={setDayFilter(dateString)}>{dateString}</a>
      );
    }

    return (
      <div className='day-nav-links'>
        {Object.keys(dayDates).slice(0, 7).map(dayLinkElement)}
      </div>
    );
  }

  const eventCard = (event: any, index: number): JSX.Element => {
    return (
      <div key={index} className='event-card'>
        <img src={calendarIconSVG} className='icon'/>
        <div className='inner'>
          <p>at {formatTime(event.startDate)}.</p>
          <p>{event.summary}</p>
        </div>
      </div>
    );
  }

  const eventByDayViewThing = () => {
    if(isFetching || data.length == 0) return;

    const eventsOnDay =
      mapToEventAbbr(data)
      .filter( event => onSameDay(event.startDate, currentDay));

    return (
      <>
        {eventsOnDay.map(eventCard)}
      </>
    );
  }

  const maybeTodayLink = !isToday && <p><a href="/events">Return to <em>Today</em></a></p>;

  return (
    <div className='events-index'>
      {dayNavigationLinks()}

      <h1>Events on {strfime('%d %B, %Y', currentDay)}</h1>
      {maybeTodayLink}



      {eventByDayViewThing()}
    </div>
  )
}

export default EventsIndex;
