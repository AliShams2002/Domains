import { createContext, useState } from "react";


export const MainContext = createContext({
    drawerIsOpen: false,
    setDrawerIsOpen: () => {}
})

const DrawerMainContext = ({children}) => {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    return(
        <MainContext.Provider value={{
            drawerIsOpen,
            setDrawerIsOpen
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default DrawerMainContext;