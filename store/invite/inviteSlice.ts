import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { InvitationType, InviteWidgetType } from "@/types/invitation";

export interface CounterState {
  invitation: InvitationType | null;
}

const initialState: CounterState = {
  invitation: null,
};

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    setInvitation: (state, action: PayloadAction<InvitationType>) => {
      state.invitation = action.payload;
    },

    changeOrder: (
      state,
      action: PayloadAction<{ id: String; direction: "up" | "down" }>
    ) => {
      if (state.invitation) {
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
      }
    },

    removeOneWidget: (state, action: PayloadAction<{ id: String }>) => {
      if (state.invitation) {
        if (
          state.invitation.InviteWidget &&
          state.invitation.InviteWidget.length > 0
        ) {
          state.invitation.InviteWidget = state.invitation.InviteWidget.filter(
            widget => widget.id !== action.payload.id
          ) as InviteWidgetType[];
        }
      }
    },

    addOneWidget: (state, action: PayloadAction<InviteWidgetType>) => {
      if (state.invitation) {
        if (state.invitation.InviteWidget) {
          state.invitation.InviteWidget.push(action.payload);
        }
      }
    },

    updateWidgetData: (state, action: PayloadAction<InviteWidgetType>) => {
      const widgetIndex: number | undefined =
        state.invitation?.InviteWidget?.findIndex(
          widget => widget.id === action.payload.id
        );
      console.log("widgetIndex: ", widgetIndex);
    },
  },
});

export const {
  setInvitation,
  changeOrder,
  removeOneWidget,
  addOneWidget,
  updateWidgetData,
} = inviteSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInvitation = (state: RootState) => state.invite.invitation;

export default inviteSlice.reducer;
