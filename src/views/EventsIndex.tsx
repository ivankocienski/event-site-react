import { useAppDispatch, useAppSelector } from "../data/hooks";
import { useSearchParams } from 'react-router-dom';
import { useFetchEventsQuery } from '../data/features/eventSlice';
import { mapToEventAbbr } from '../data/types';
import { useState, useEffect } from 'react';

import strfime from 'strftime';

import EventCard from '../widgets/EventCard';
import DayNavigationLinks from '../widgets/DayNavigationLinks';
import { fetchPartners, PartnerLoadState } from "../data/features/partnerSlice";

import './EventsIndex.scss';
// import calendarIconSVG from '../assets/calendar-icon.svg';

import { onSameDay, parseDate } from '../common/DateAndTime';

//
// componnet
//

type OnClickHandlerType = (event: React.MouseEvent) => void;

function EventsIndex() {
  const [ searchParams, setSearchParams ]
    = useSearchParams();

  const [ currentDay, setCurrentDay ]
    = useState(parseDate(searchParams.get("day")) || new Date());

  const isToday
    = onSameDay(currentDay, new Date());

  const { data = [], isFetching }
    = useFetchEventsQuery();

  const partnerAbbrList
    = useAppSelector( state => state.partner.partners );
  const partnerListState = useAppSelector( state => state.partner.state );

  const dispatch = useAppDispatch();

  useEffect( () => {
    if(partnerListState == PartnerLoadState.NEW) {
      console.log("partners index useEffect");
      dispatch(fetchPartners());
    }
  });

  if(isFetching || data.length == 0) {
      return (
          <div className='events-index'>
            <h1>Loading...</h1>
          </div>
      );
    }

  const makeDayFilterHandlerFor = (day: Date): OnClickHandlerType => {
    const dateParamString = strfime('%Y-%m-%d', day)

    return (event: React.MouseEvent) => {
      event.preventDefault();
      console.log("nav link clicked: ", dateParamString);

      setSearchParams({
        day: dateParamString
      });

      setCurrentDay(day);
    };
  }

  const eventAbbrList = mapToEventAbbr(data);
  const eventsOnDay = eventAbbrList
      .filter( event => onSameDay(event.startDate, currentDay));

  const maybeTodayLink = !isToday && <p><a href="/events">Return to <em>Today</em></a></p>;


  return (
    <div className='events-index'>
      <DayNavigationLinks events={eventAbbrList} currentDay={currentDay} clickHandlerGenerator={makeDayFilterHandlerFor} />
      <h1>Events on {strfime('%d %B, %Y', currentDay)}</h1>

      {maybeTodayLink}

      {eventsOnDay.map( event => <EventCard key={event.id} eventAbbr={event} partnerAbbrList={partnerAbbrList} />)}
    </div>
  )
}

export default EventsIndex;
