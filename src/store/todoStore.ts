import { todo } from '../vendor/todo'
import { observable, action, computed, makeObservable } from 'mobx'

class TodoStore {
	todoList: todo[] = [
		{
			id: 1,
			text: "Создать todo",
			complete: false
		},
		{
			id: 2,
			text: "Реализовать dnd",
			complete: false
		},
		{
			id: 3,
			text: "Сделать перерыв на чай",
			complete: true
		},
	]

	constructor() {
		makeObservable(this, {
			todoList: observable,
			availableId: computed,
			addTodo: action,
			removeTodo: action,
			changeTodo: action,
			changeStatus: action
		})
		this.addTodo = this.addTodo.bind(this)
		this.removeTodo = this.removeTodo.bind(this)
		this.changeTodo = this.changeTodo.bind(this)
		this.changeStatus = this.changeStatus.bind(this)
	}

	get availableId() {
		const arr = this.todoList.map(el => el.id)
		return Math.max.apply(null, arr) + 1
	}

	addTodo(text: string, complete: boolean): void {
		//rdevbgder
	}

	removeTodo(id: number): void {
		this.todoList.forEach((el, i) => {
			if (el.id === id) this.todoList.splice(i, 1)
		})
	}

	changeTodo(id: number, newText: string): void {
		
	}

	changeStatus(id: number): void {
		this.todoList.forEach((el, i) => {
			if (el.id === id) this.todoList[i].complete = !this.todoList[i].complete
		})
	}
}

const todoStore = new TodoStore()

export default todoStore