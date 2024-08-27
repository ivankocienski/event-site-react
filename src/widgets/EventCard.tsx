
import { EventAbbr } from '../data/types';

import { formatTime } from '../common/DateAndTime';

interface EventCardProps {
    eventAbbr: EventAbbr
}

export default function ({eventAbbr}: EventCardProps) {
    return (
        <article className='event-card'>
            <div className='inner'>
                <p>at {formatTime(eventAbbr.startDate)}, from {eventAbbr.organizer.id}</p>
                <p>{eventAbbr.summary}</p>
            </div>
        </article>
    );
}

/*
export default function ({event}: EventCardProps) {
    return (
        <article className='event-card'>
            <img src={calendarIconSVG} className='icon' />
            <div className='inner'>
                <p>at {formatTime(event.startDate)}, from {event.organizer.id}</p>
                <p>{event.summary}</p>
            </div>
        </article>
    );
} */