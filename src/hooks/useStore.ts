import { useContext } from 'react'
import { storeContext } from '../store/rootStore'

export const useStore = () => useContext(storeContext)