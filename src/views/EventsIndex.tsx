import { useAppDispatch, useAppSelector } from "../data/hooks";
import { incremented, decremented, reset } from "../data/features/counterSlice";

function EventsIndex() {
  const counterValue = useAppSelector( state => state.counter.value );
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

  return (
    <>
      <h1>A EventsIndex thing</h1>
      <p>Count: {counterValue} </p>
      <div>
        <button onClick={handleIncrementClick}>++</button>
        <button onClick={handleDecrementedClick}>--</button>
        <button onClick={handleResetClick}>=0</button>
      </div>
    </>
  )
}

export default EventsIndex;
