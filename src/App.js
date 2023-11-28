import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';

import Store from './routes/store/Store.js';

function App() {

	const [ state, setState ] = useState({
		// ユーザー情報
		userDetail: localStorage.getItem('userDetail')
						? JSON.parse(localStorage.getItem('userDetail'))
						: null,
		// ログイン時のエラーメッセージ
		errorMessage: null,
		// ページ全体にローディングアニメーションを表示するか
		loading: false,
	});

	const setStateItem = (key, value) => {
		setState(prevState => ({
			...prevState,
			[key]: value
		}));
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to='/top' replace/>} />
				{/* ストアページ */}
				<Route path="/:section/*" element={<Store state={state} setStateItem={setStateItem}/>} />
			</Routes>
      	</BrowserRouter>
	);
	
}

export default App;
