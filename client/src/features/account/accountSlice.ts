import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, any>(
    "account/signInUser",
    async (userDto, thunkAPI) => {
        try {
            // const userDto = await agent.Account.login(data);
            const { basket, ...user } = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const userDto = await agent.Account.currentUser();
            const { basket, ...user } = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem("user", JSON.stringify(user));
            return user; 
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user")) return false;
        }
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: state => {
            state.user = null;
            localStorage.removeItem("user");
            window.location.href = "http://localhost:3000/";
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(signInUser.rejected, (_, action) => {
            console.log(action.error);
        });
        builder.addCase(fetchCurrentUser.rejected, state => {
            state.user = null;
            localStorage.removeItem("user");
            window.location.href = "http://localhost:3000/login";
            toast.error("Session expired. Please log in again");
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { signOut, setUser } = accountSlice.actions;