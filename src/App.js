import { useEffect, useState } from 'react'
import './App.css'

function App() {
	let today = new Date().toISOString().replace(/T.*/, '').split('-').join('-')

	const [dateSelected, setDateSelected] = useState(today)
	const [state, setState] = useState({})

	const url = 'https://localhost:7118/Account/GetBalancebyDate';
	const fetchData = () => {
		fetch(`${url}/${dateSelected}`)
			.then((res) => res.json())
			.then((data) => setState(data))
			.catch(err => (err))
	}

	const handleChange = (e) => {
		setDateSelected(e.target.value)
	}
	useEffect(() => {
		fetchData()
	}, [dateSelected])

	return (
		<div className='App'>
			<form>
				<label htmlFor='date'>Select a date</label>
				<input type='date' name='date' id='date' value={dateSelected} onChange={handleChange} />
			</form>
			{ (
				<div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'flex-start', alignItems: 'center' }}>
					<br />
					<div>Balance: ${state.balance ? (state.balance).toFixed(2) : 0}</div>
					<br />
					<div>Total Credits: ${state.totalCredits ? (state.totalCredits).toFixed(2) : 0}</div>
					<br />
					<div>Total Debits: ${state.totalDebits ? (state.totalDebits).toFixed(2) : 0}</div>
				</div>
			)}
		</div>
	)
}

export default App
