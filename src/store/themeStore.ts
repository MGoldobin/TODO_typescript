import { observable, action, makeObservable } from 'mobx'
import { theme, lightTheme, darkTheme }  from '../vendor/theme'

class ThemeStore {
	isDarkTheme: boolean = !localStorage.getItem('isDarkTheme') ? false : (localStorage.getItem('isDarkTheme') === "true" ? true : false)
	theme: theme = !localStorage.getItem('isDarkTheme') ? lightTheme : (localStorage.getItem('isDarkTheme') === "true" ? darkTheme : lightTheme)

	constructor() {
		makeObservable(this, {
			isDarkTheme: observable,
			theme: observable,
			changeTheme: action
		})
		this.changeTheme = this.changeTheme.bind(this)
	}

	changeTheme(): void {
		this.isDarkTheme = !this.isDarkTheme
		this.theme = this.isDarkTheme ? darkTheme : lightTheme
		localStorage.setItem('isDarkTheme', this.isDarkTheme.toString())
	}
}

const themeStore = new ThemeStore()

export default themeStore