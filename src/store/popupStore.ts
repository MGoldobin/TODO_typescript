import { observable, action, makeObservable } from 'mobx'
import { todo } from '../vendor/todo'

class PopupStore {
	isOpenAddPopup: boolean = false
	isOpenChangePopup: boolean = false
	popupTask: todo = {
		id: 999,
		text: "",
		complete: false,
		order: 999
	}

	constructor() {
		makeObservable(this, {
			isOpenAddPopup: observable,
			isOpenChangePopup: observable,
			popupTask: observable,
			changeAddPopup: action,
			changeChangePopup: action,
			setTask: action
		})
		this.changeAddPopup = this.changeAddPopup.bind(this)
		this.changeChangePopup = this.changeChangePopup.bind(this)
		this.setTask = this.setTask.bind(this)
	}

	changeAddPopup(value: boolean) {
		this.isOpenAddPopup = value
	}

	changeChangePopup(value: boolean) {
		this.isOpenChangePopup = value
	}

	setTask(task:todo) {
		this.popupTask = task
	}
}

const popupStore = new PopupStore()

export default popupStore