import { createContext } from "react"
import themeStore from "./themeStore"
import todoStore from "./todoStore"
import popupStore from "./popupStore"

export const storeContext = createContext({
	themeStore,
	todoStore,
	popupStore
})