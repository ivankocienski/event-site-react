import { useAppDispatch } from "../data/hooks";
import { useFetchEventsQuery } from '../data/features/eventSlice';

function EventsIndex() {
  const dispatch = useAppDispatch();
  const { data = [], isFetching } = useFetchEventsQuery();

  function eventTable() {
    if(data.length == 0) return;

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>summary</th>
            <th>start date</th>
            <th>organiser ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map( (row, index) => 
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.summary}</td>
              <td>{typeof row.startDate.toDateString}</td>
              <td>{row.organizer.id}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <h1>A EventsIndex thing</h1>
      <p>data.lenth={data.length}</p>
      <p>isFetching={isFetching ? 'Yes' : 'No'}</p>

      {eventTable()}
    </>
  )
}

export default EventsIndex;
