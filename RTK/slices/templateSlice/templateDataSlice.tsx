import { rootState } from "@/RTK/store";
import { initialStateTemplate } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {}
type TemplateKeys = keyof initialStateTemplate

const templateDataSlice = createSlice({
    name: 'templateDataSlice',
    initialState,
    reducers: {
        addTemplate: (state, action: PayloadAction<initialStateTemplate>) => {
            // Replace the entire template state with the provided template
            return action.payload as any
        },
        editTemplateData: (state, action: PayloadAction<{ newData: any, key: TemplateKeys }>) => {
            const { newData, key } = action.payload;
            state[key] = newData
        },
        removeTemplateSection: (state, action: PayloadAction<{ key: TemplateKeys }>) => {
            const { key } = action.payload;
            // Mark section as removed. We use null so UI conditional rendering will hide it.
            state[key] = null
        },
        resetTemplate: (state, action: PayloadAction<initialStateTemplate>) => {
            // Reset to a provided base template (e.g., original server template)
            return action.payload as any
        }
    },
})

//states 
export const templateDataState = (state: rootState) => state.templateDataOne

// actions
export const { editTemplateData, addTemplate, removeTemplateSection, resetTemplate } = templateDataSlice.actions
export default templateDataSlice.reducer