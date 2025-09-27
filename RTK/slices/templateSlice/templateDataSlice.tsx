import { rootState } from "@/RTK/store";
import { initialStateTemplate } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {}
type TemplateKeys = keyof initialStateTemplate

const templateDataSlice = createSlice({
    name: 'templateDataSlice',
    initialState,
    reducers: {
        addTemplate: (state, action) => {
            // const { key, sectionData } = action.payload
            state = action.payload
        },
        editTemplateData: (state, action: PayloadAction<{ newData: any, key: TemplateKeys }>) => {
            const { newData, key } = action.payload;
            state[key] = newData
        }
    },
})

//states 
export const templateDataState = (state: rootState) => state.templateDataOne

// actions
export const { editTemplateData, addTemplate } = templateDataSlice.actions
export default templateDataSlice.reducer