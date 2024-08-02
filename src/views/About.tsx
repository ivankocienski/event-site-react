
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { incremented, decremented, reset, fetchCounts } from "../data/features/counterSlice";

function About() {
  const counterValue = useAppSelector( state => state.counter.value );
  const partnerCount = useAppSelector( state => state.counter.numPartners );
  const eventCount = useAppSelector( state => state.counter.numEvents );
  const dispatch = useAppDispatch();

  function handleIncrementClick() {
    dispatch(incremented());
  }

  function handleDecrementedClick() {
    dispatch(decremented());
  }

  function handleResetClick() {
    dispatch(reset());
  }

  function handleFetchCountsClick() {
    dispatch(fetchCounts());
  }

  return (
    <>
      <h1>About?</h1>
      <p>Count: {counterValue} </p>
      <div>
        <button onClick={handleIncrementClick}>++</button>
        <button onClick={handleDecrementedClick}>--</button>
        <button onClick={handleResetClick}>=0</button>
      </div>
      <h2>More things</h2>
      <p>Partner Count: {partnerCount}, Event Count: {eventCount}</p>
      <div>
        <button onClick={handleFetchCountsClick}>Fetch Counts!</button>
      </div>
    </>
  )
}

export default About;