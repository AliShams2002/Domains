import { createSlice } from "@reduxjs/toolkit"


const domainsSlice = createSlice({
    name: 'domain',
    initialState: {
        domainsList: []
    },
    reducers: {
        getDomains : (state, action) => {
            state.domainsList = action.payload;
        },
        addDomain : (state, action) => {
            state.domainsList.push(action.payload);
        },
        editDomain : (state, action) => {
            const item = state.domainsList.findIndex(i => i.id == action.payload.id);
            state.domainsList[item] = action.payload;
        },
        deleteDomain : (state, action) => {
            const id = action.payload;
            state.domainsList = state.domainsList.filter(i => i.id != id);
        }
    }
})

export default domainsSlice.reducer;
export const {getDomains, addDomain, editDomain, deleteDomain} = domainsSlice.actions;