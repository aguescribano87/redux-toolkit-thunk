import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Photo {
    id: string
    author: string
    width: number
    height: number,
    url: string,
    download_url: string
}

interface initialType {
    photos: Photo[]
    loading: boolean
}

export const getPhotos = createAsyncThunk(
    'gallery/photos',
    async (page: number) => {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
        const parseRes = await res.json()
        return parseRes
    }
)

const initialState: initialType = {
    photos: [],
    loading: false
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.pending, (state) => {
                state.loading = true
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loading = false
                state.photos.push(...action.payload)
            })
            .addCase(getPhotos.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export default gallerySlice.reducer