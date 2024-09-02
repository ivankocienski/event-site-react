
export interface Summary {
  partnerCount: number;
  eventCount: number;
}

export interface Address {
  streetAddress: string;
  postalCode: string;
}

export interface Organizer {
  id: number;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  summary:string;
  startDate: Date;
  endDate: Date;
  publisherUrl: string;
  address: Address;
  organizer: Organizer;
}

export interface EventAbbr {
  id: number;
  summary: string;
  startDate: Date;
  organizer: Organizer;
}

export function mapToEventAbbr(events: any[]): EventAbbr[] {
  return events.map(event => ({
    ...event,
    startDate: new Date(event.startDate)
  }));
}