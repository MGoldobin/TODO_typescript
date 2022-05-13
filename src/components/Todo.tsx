import React from 'react'
import { todo } from '../vendor/todo'
import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import styled from 'styled-components'

const StyledTodo = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	border: 1px solid #000;
	padding: 10px;
	background-color: ${props => props.theme.todoBgColor};
	border-radius: 4px;
  position: relative;

	& p {
		margin: 0;
	}

	& button {
		background-color: ${props => props.theme.todoBgColor};
		width: 22px;
		height: 22px;
		border: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
	}
`

const StatusButton = styled.button`
	border-radius: 50px;
	font-weight: 900;
	font-size: 16px;
	line-height: 16px;

	&:hover {
		opacity: .9;
	}
`

const ChangeButton = styled.button`
	background-image: url(${props => props.theme.isDarkTheme ? "./penWhite.png" : "./penBlack.png"});
	background-repeat: no-repeat;
	background-size: contain;
	position: absolute;
	right: 42px;
`

const RemoveButton = styled.button`
	background-image: url(${props => props.theme.isDarkTheme ? "./binWhite.png" : "./binBlack.png"});
	background-repeat: no-repeat;
	background-size: contain;
  position: absolute;
	right: 10px;
`

const Todo = observer(({task}: {task: todo}) => {
	const { themeStore, todoStore } = useStore()

	const handleRemoveClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		todoStore.removeTodo(task.id)
	}

	const handleToggleClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		todoStore.changeStatus(task.id)
	}

	const handleChangeClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		//Вылазит попап))
		alert("ПОПАП!!!")
	}

	return (
		<StyledTodo theme={themeStore.theme}>
			<StatusButton 
				style={{'backgroundColor': task.complete ? "var(--completeButton)" : "var(--unCompleteButton)"}}
				children={task.complete ? "+" : "-"}
				onClick={handleToggleClick}
			/>
			<p>{task.text}</p>
			<ChangeButton 
				theme={themeStore}
				onClick={handleChangeClick}
			/>
			<RemoveButton 
				theme={themeStore} 
				onClick={handleRemoveClick}
			/>
		</StyledTodo>
	)
})

export default Todo