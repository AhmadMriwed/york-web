import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import languageReducer from './features/language/languageSlice';


export const store = configureStore({
    reducer: {
        language: languageReducer,
       
    }
});

// Infer the type of the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
