
export interface Summary {
  partnerCount: number;
  eventCount: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  summary:string;
  startDate: Date;
  endDate: Date;
  publisherUrl: string;
  address: {
      streetAddress: string;
      postalCode: string;
  };
  organizer: { id: number };
}

export interface EventAbbr {
  id: number;
  summary: string;
  startDate: Date;
  organizer: { id: number }
}

export function mapToEventAbbr(events: any[]): EventAbbr[] {
  return events.map(event => ({
    ...event,
    startDate: new Date(event.startDate)
  }));
}