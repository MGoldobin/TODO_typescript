import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useStore } from './hooks/useStore'
import SwitchButton from './components/UI/SwitchButton'
import Todo from './components/Todo'
import { ConsoleLog } from './vendor/consoleLog'

const StyledApp = styled.div`
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.bgColor};
  min-height: 100vh;
  width: 100vw;
  padding: 30px 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const Title = styled.h1`
  margin: 0;
`

const Board = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;

  & h2 {
    text-align: center;
  }
`

const App = observer(() => {
  const { themeStore, todoStore } = useStore()

  return (
    <StyledApp theme={themeStore.theme}>
      <Title>TODO</Title>
      <Board>
        <Field>
          <h2>В процессе</h2>
          {
            todoStore.todoList.filter(todo => todo.complete).map(todo => <Todo task={todo} key={todo.id}/>)
          }
        </Field>
        <Field>
          <h2>Выполнено</h2>
          {
            todoStore.todoList.filter(todo => !todo.complete).map(todo => <Todo task={todo} key={todo.id}/>)
          }
        </Field>
      </Board>
      <SwitchButton/>
    </StyledApp>
  )
})

export default App