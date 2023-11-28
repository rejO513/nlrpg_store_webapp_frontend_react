import React from 'react'
import { Popup, Icon, Image } from 'semantic-ui-react'

import LoginHandler from './LoginHandler.js'
import LogoutButton from './LogoutButton.js';

// ナビゲーションメニュー上のユーザーアイコン
function UserIconInNavMenu({state, setStateItem}) {

	if(!localStorage.getItem('userDetail')){
		return (
			<Popup trigger={
			  <Icon circular inverted name='user outline' size='large' />
			} flowing hoverable>
				{/* カーソルを合わせたときにログイン画面を表示 */}
			  <LoginHandler state={state} setStateItem={setStateItem}/>
			</Popup>
		);
	}else{
		return (
			<Popup trigger={
			  <Image src={state.userDetail.image_url} circular bordered size='mini'/>
			} flowing hoverable>
				{/* カーソルを合わせたときにログアウトボタンを表示 */}
			  <LogoutButton state={state} setStateItem={setStateItem}/>
			</Popup>
		);
	}
}

export default UserIconInNavMenu