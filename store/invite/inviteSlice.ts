import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { InvitationType, InviteWidgetType } from "@/types/invitation";

// Define a type for the slice state
export interface CounterState {
  value: number;
  invitation: InvitationType;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  invitation: {},
};

export const inviteSlice = createSlice({
  name: "invite",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    setInvitation: (state, action: PayloadAction<InvitationType>) => {
      state.invitation = action.payload;
    },
    changeOrder: (
      state,
      action: PayloadAction<{ id: String; direction: "up" | "down" }>
    ) => {
      console.log(action.payload);
      const usedWidgets = state.invitation.InviteWidget as InviteWidgetType[];
      const id = action.payload.id;
      const direction = action.payload.direction;
      for (let i = 0; i < usedWidgets.length; i++) {
        if (
          usedWidgets[i].id === id &&
          direction === "up" &&
          usedWidgets[i].order > 0
        ) {
          usedWidgets[i].order = usedWidgets[i].order - 1;
          usedWidgets[i - 1].order = usedWidgets[i - 1].order + 1;
        }
        if (
          usedWidgets[i].id === id &&
          direction === "down" &&
          usedWidgets[i].order < usedWidgets.length - 1
        ) {
          usedWidgets[i].order = usedWidgets[i].order + 1;
          usedWidgets[i + 1].order = usedWidgets[i + 1].order - 1;
        }
      }
      usedWidgets.sort((a, b) => a.order - b.order);
      for (let i = 0; i < usedWidgets.length; i++) {
        usedWidgets[i].order = i;
      }
      state.invitation.InviteWidget = usedWidgets;
    },
    removeOneWidget: (state, action: PayloadAction<{ id: String }>) => {
      if (
        state.invitation.InviteWidget &&
        state.invitation.InviteWidget.length > 0
      ) {
        state.invitation.InviteWidget = state.invitation.InviteWidget.filter(
          widget => widget.id !== action.payload.id
        ) as InviteWidgetType[];
      }
    },
    addOneWidget: (state, action: PayloadAction<InviteWidgetType>) => {
      if (state.invitation.InviteWidget) {
        state.invitation.InviteWidget.push(action.payload);
      }
    },
  },
});

export const { setInvitation, changeOrder, removeOneWidget, addOneWidget } =
  inviteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.invite.value;
export const selectInvitation = (state: RootState) => state.invite.invitation;

export default inviteSlice.reducer;
