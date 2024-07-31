import axios from 'axios';
import { Summary } from './types';

const BASE_URL = 'http://localhost:8001';

export async function getSummary(): Promise<Summary> {
  const { data } = await axios.get(
    `${BASE_URL}/`
  );

  // console.log(data);

  return {
    partnerCount: data.partnerCount,
    eventCount: data.eventCount
  };
}
