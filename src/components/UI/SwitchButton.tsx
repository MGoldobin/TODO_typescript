import React from 'react'
import styled from 'styled-components'
import Switch from '@mui/material/Switch'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/useStore'

const StyledSwitchButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const SwitchButton = observer(() => {
	const { themeStore } = useStore()

	return (
		<StyledSwitchButton>
			<img src={themeStore.isDarkTheme ? "./moonWhite.png" : "./moonBlack.png"} alt="Dark mode" />
			<Switch 
				checked={themeStore.isDarkTheme}
				onChange={themeStore.changeTheme} 
				color="default"
			/>
		</StyledSwitchButton>
	)
})

export default SwitchButton