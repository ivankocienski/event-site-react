import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

/* 
defining typed hooks so our components can read values and 
trigger actions from our store 
*/

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
import  { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// these are in separate file so we don't end up with
// circular dependencies

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

*/