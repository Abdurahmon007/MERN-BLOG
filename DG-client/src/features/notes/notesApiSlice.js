import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter();
const initialState = notesAdapter.getInitialState();
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id: "LIST" })),
          ];
        }
      },
    }),
  }),
});

export const { useGetNotesQuery } = notesApiSlice;

// returns query result object
export const selectNotesResult = notesApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

// getSelectors create these selectors and we rename them with aliases
export const {
  selectAll: selectAllNotes,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
); // bu yerda selectUsersData ga argument qilib berilgan state usersResult nomi bilan qabul qilinadi
