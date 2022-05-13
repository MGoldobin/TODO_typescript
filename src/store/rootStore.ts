import { createContext } from "react"
import themeStore from "./themeStore"
import todoStore from "./todoStore"

export const storeContext = createContext({
	themeStore,
	todoStore
})