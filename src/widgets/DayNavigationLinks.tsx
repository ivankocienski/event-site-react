
import { EventAbbr } from '../data/types';
import { onSameDay } from '../common/DateAndTime';
import strfime from 'strftime';

type OnLinkClickHandler = (event: React.MouseEvent) => void;
type ClickHandlerGenerator = (day: Date) => OnLinkClickHandler;
type DateMapType = Record<string, Date>;

interface DayNavigationLinkProps {
    events: EventAbbr[],
    currentDay: Date,
    clickHandlerGenerator: ClickHandlerGenerator
}

export default function ( { events, currentDay, clickHandlerGenerator }: DayNavigationLinkProps) {

    const dayDates =
        events.reduce((dateMap: DateMapType, event): DateMapType => {
            let dateString = event.startDate.toISOString().slice(0, 10);
            if (dateString in dateMap) {
                return dateMap;
            }
            dateMap[dateString] = event.startDate;
            return dateMap;
        }, {});

    const dayLinkElement = (dayDate: Date, key: number): JSX.Element => {

        // const dayString = strfime('%A %-d %B, %Y', dayDate);
        const dayString = strfime('%A %-d', dayDate);
        if (onSameDay(dayDate, currentDay)) {
            return <span className='nav' key={key}>{dayString}</span>;
        }

        return (
            <a className='nav' key={key} href='#' onClick={clickHandlerGenerator(dayDate)}>{dayString}</a>
        );
    }

    const next7Days = Object.values(dayDates).slice(0, 7);

    return (
        <div className='day-nav-links'>
            {next7Days.map(dayLinkElement)}
        </div>
    );
}