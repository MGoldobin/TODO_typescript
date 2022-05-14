import React, { ReactNode, useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useStore } from '../../hooks/useStore'
import { observer } from 'mobx-react-lite'

const StyledPopup = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, .8);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
`

const PopupBody = styled.div`
	background-color: ${props => props.theme.bgColor};
	height: 200px;
	width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`

const StyledInput = styled.input`

`

interface IPopup {
	children?: ReactNode
}

const Popup = observer(({children}:IPopup) => {
	const { themeStore, popupStore } = useStore()
	useEffect(() => {
    document.addEventListener("keydown", e => {
			if(e.key === "Escape") {
				popupStore.changeAddPopup(false)
				popupStore.changeChangePopup(false)
			}
		})
	}, [])

	const handleClose =() => {
		popupStore.changeAddPopup(false)
		popupStore.changeChangePopup(false)
	}
	
	return (
		<StyledPopup onClick={handleClose}>
			<PopupBody onClick={e => e.stopPropagation()} theme={themeStore.theme}>
				{children}
			</PopupBody>
		</StyledPopup>
	)
})

export const ChangePopup = observer(() => {
	const { todoStore, popupStore } = useStore()
	const [taskText, setTaskText] = useState<string>(popupStore.popupTask.text)

	const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskText(e.target.value)
	}

	const handleChange = () => {
		todoStore.changeTodo({
			id: popupStore.popupTask.id,
			text: taskText,
			complete: popupStore.popupTask.complete,
			order: popupStore.popupTask.order
		})
		popupStore.changeChangePopup(false)
	}

	return (
		<Popup>
			<StyledInput value={taskText} onChange={handleChangeText} type="text"/>
			<button onClick={taskText ? handleChange : undefined}>Сохранить</button>
		</Popup>
	)
})

export const AddPopup = observer(() => {
	const { todoStore, popupStore } = useStore()
	const [taskText, setTaskText] = useState("")

	const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskText(e.target.value)
	}

	const handleAdd = () => {
		todoStore.addTodo({
			id: todoStore.availableId,
			text: taskText,
			complete: false,
			order: todoStore.availableId
		})
		popupStore.changeAddPopup(false)
	}

	return (
		<Popup>
			<StyledInput value={taskText} onChange={handleChangeText} type="text"/>
			<button onClick={taskText ? handleAdd : undefined}>Добавить</button>
		</Popup>
	)
})