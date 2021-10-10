import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppState } from './store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export { useDispatch };
