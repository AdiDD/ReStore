import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDsipatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDsipatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;