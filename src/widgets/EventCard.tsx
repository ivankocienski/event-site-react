import {Link} from "react-router-dom";

import { EventAbbr, Organizer } from '../data/types';

import { formatTime } from '../common/DateAndTime';
import { PartnerAbbrType } from '../data/features/partnerSlice';

interface EventCardProps {
    eventAbbr: EventAbbr,
    partnerAbbrList: PartnerAbbrType[]
}

export default function ({eventAbbr, partnerAbbrList}: EventCardProps) {

    function partnerLinkForOrganizer(organizer: Organizer) {
        const wantId: number = parseInt(organizer.id as any);
        const partner = partnerAbbrList.find( partner => partner.id === wantId);

        if(!partner) return <span>Not found</span>;

        return <Link to={`/partners/${partner.id}`}>{partner.name}</Link>;
    }

    return (
        <article className='event-card'>
            <div className='inner'>
                <p>at {formatTime(eventAbbr.startDate)}, from {eventAbbr.organizer.id}</p>
                <p>{eventAbbr.summary}</p>
                <p>{partnerLinkForOrganizer(eventAbbr.organizer)}</p>
            </div>
        </article>
    );
}