import { todo } from '../vendor/todo'
import { observable, action, computed, makeObservable } from 'mobx'

class TodoStore {
	todoList: todo[] = [
		{
			id: 1,
			text: "Создать todo",
			complete: true,
			order: 1
		},
		{
			id: 2,
			text: "Реализовать dnd<never>",
			complete: false,
			order: 2
		},
		{
			id: 3,
			text: "Сделать перерыв на чай",
			complete: true,
			order: 3
		},
	]

	constructor() {
		makeObservable(this, {
			todoList: observable,
			availableId: computed,
			addTodo: action,
			removeTodo: action,
			changeTodo: action,
			changeStatus: action,
			newList: action
		})
		this.addTodo = this.addTodo.bind(this)
		this.removeTodo = this.removeTodo.bind(this)
		this.changeTodo = this.changeTodo.bind(this)
		this.changeStatus = this.changeStatus.bind(this)
		this.newList = this.newList.bind(this)
	}

	get availableId() {
		const arr = this.todoList.map(el => el.id)
		return Math.max.apply(null, arr) + 1
	}

	addTodo(newTodo: todo): void {
		this.todoList.push(newTodo)
	}

	removeTodo(id: number): void {
		this.todoList.forEach((el, i) => {
			if (el.id === id) this.todoList.splice(i, 1)
		})
	}

	newList(newList: todo[]): void {
		this.todoList = newList
	}

	changeTodo(newTodo: todo): void {
		this.todoList.forEach((el, i) => {
			if (el.id === newTodo.id) this.todoList[i] = newTodo
		})
	}

	changeStatus(id: number): void {
		this.todoList.forEach((el, i) => {
			if (el.id === id) this.todoList[i].complete = !this.todoList[i].complete
		})
	}
}

const todoStore = new TodoStore()

export default todoStore