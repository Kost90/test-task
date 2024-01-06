import { createContext, useContext, useReducer } from 'react';
import { AnnounceReducer } from './AnouncementReducer';
import { data } from '../api/data/DataApi';

// const initialTasks = []

export const AnnouncementContext = createContext(null);
const AnnounceDispatchContext = createContext(null);

export const AnnouncementProvider = ({children}) => {
const [announcement, dispatch] = useReducer(AnnounceReducer, data)

return(
    <AnnouncementContext.Provider value={announcement}>
        <AnnounceDispatchContext.Provider value={dispatch}>
        {children}
        </AnnounceDispatchContext.Provider> 
    </AnnouncementContext.Provider>
)
}

export const useAnnouncement = () => {
    const value = useContext(AnnouncementContext)

    if(value === null){
        throw new Error('useTasks must be used within a TasksProvider')
    }

    return value
}

export const useDispatch = () =>{
    const value = useContext(AnnounceDispatchContext)

    if(value === null){
        throw new Error('useDispatch must be used within a TasksProvider')
    }

    return value
}



