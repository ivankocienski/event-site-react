
import { EventAbbr } from '../data/types';
import { onSameDay } from '../common/DateAndTime';

type OnLinkClickHandler = (event: React.MouseEvent) => void;
type ClickHandlerGenerator = (dateString: string) => OnLinkClickHandler;
type DateMapType = Record<string, boolean>;

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
            dateMap[dateString] = true;
            return dateMap;
        }, {});

    const dayLinkElement = (dateString: string, key: number): JSX.Element => {
        const dayDate = new Date(dateString);

        if (onSameDay(dayDate, currentDay)) {
            return <span className='nav' key={key}>{dateString}</span>;
        }

        return (
            <a className='nav' key={key} href='#' onClick={clickHandlerGenerator(dateString)}>{dateString}</a>
        );
    }

    return (
        <div className='day-nav-links'>
            {Object.keys(dayDates).slice(0, 7).map(dayLinkElement)}
        </div>
    );
}