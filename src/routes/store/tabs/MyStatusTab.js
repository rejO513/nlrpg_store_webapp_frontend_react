import React, { useState } from 'react';
import { Icon, Header, Message, Table, Grid, Button, Input, Dropdown } from 'semantic-ui-react';
import LoginHandler from '../../../components/LoginHandler';
import LogoutButton from '../../../components/LogoutButton';
import { ViewUserStatus } from '../../../components/UserStatus';
import '../Store.css'
import SaveButton from '../../../components/SaveButton';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { EDITION_SELECT, TEXT } from '../../../LocalConstant';

// ユーザーステータスのタブ
function MyStatusTab({state, setStateItem}){

    if(!localStorage.getItem('userDetail')){
        // ログインしていない場合
        return (
            <div>
                <Message info>
                    ステータスを表示するにはログインが必要です。
                </Message>
                {/* Googleアカウントでのユーザー登録/ログインボタン */}
                <LoginHandler state={state} setStateItem={setStateItem}/>
            </div>
        );
    }

    // ログインしている場合
    return (
        <Routes>
            {/* ユーザーステータス閲覧用 */}
            <Route path="" element={<ViewMyStatus state={state} setStateItem={setStateItem}/>}/>
            {/* ユーザーステータス編集用 */}
            <Route path="edit" element={<EditMyStatus state={state} setStateItem={setStateItem}/>}/>
        </Routes>
    );
}

export default MyStatusTab;

// ユーザーステータス閲覧用
function ViewMyStatus({ state, setStateItem }){

    const user = state.userDetail;
    const navigate = useNavigate();

    const mc_accounts = user.minecraft_accounts;

    return (
        <div>
            {/*ヘッダー*/}
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8} textAlign="left">
                        <Header as='h3'>
                            ユーザーステータス
                            <Header.Subheader>
                            ユーザーの登録情報を確認・編集します。
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="right">
                        {/* 編集ボタン */}
                        <Icon link name='edit' size='large' onClick={() => navigate('edit')}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                
            {/* ステータス表示部 */}
            <Table basic='very'>
                <Table.Body>
                    {/* 各行をコンポーネントに分割 */}
                    <ViewUserStatus label="メールアドレス" value={user.email}/>
                    <ViewUserStatus label="表示名" value={user.username}/>
                    <ViewUserStatus 
                        label={<>Discord ID <Icon name='discord'/></>} 
                        value={user.discord_id ? user.discord_id : TEXT.NOT_ENTERED}
                    />
                    <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell><b>ユーザー名</b></Table.Cell>
                        <Table.Cell><b>プラットフォーム</b></Table.Cell>
                        <Table.Cell><b>優先接続権</b></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell><b>Minecraft アカウント</b></Table.Cell>
                        {mc_accounts !== 0 ? (
                            <>
                                <Table.Cell>
                                    {mc_accounts.map((item, index) => (
                                        <p key={index}>{item['mcid']}</p>
                                    ))}
                                </Table.Cell>
                                <Table.Cell>
                                    {mc_accounts.map((item, index) => (
                                        <p key={index} className='capitalize-first-letter'>{item['edition']} Edition</p>
                                    ))}
                                </Table.Cell>
                                <Table.Cell>
                                    {mc_accounts.map((item, index) => (
                                        <p key={index}>
                                            {item['priority_access'] ? (
                                                <Icon name='check' size='large' color='green'/>
                                            ):(
                                                <Icon name='cancel' size='large' color='red'/>
                                            )}
                                        </p>
                                    ))}
                                </Table.Cell>
                            </>
                            ) : (
                                <Table.Cell>
                                    {TEXT.NOT_ENTERED}
                                </Table.Cell>
                            )
                        }
                    </Table.Row>
                </Table.Body>
            </Table>
            <br />
            {/* ログアウトボタン */}
            <LogoutButton state={state} setStateItem={setStateItem}/>
        </div>
    );
}

// ユーザーステータス編集用
function EditMyStatus({ state, setStateItem }){

    const user = state.userDetail;
    const navigate = useNavigate();

    const email = user.email;
    const username = user.username;
    const discord_id = user.discord_id ? user.discord_id : "";
    const mc_accounts = user.minecraft_accounts;

    // 入力中のデータを保持
    const [inputValue, setInput] = useState({
        display_name: username,
        discord_id: discord_id,
        new_mc_account_name: null,
        new_mc_account_edition: null,
    });

    const setInputValue = (key, value) => {
		setInput(prevState => ({
			...prevState,
			[key]: value
		}));
	}

    // 入力が変化したとき
    const handleInputChange = (e) => {
        setInputValue(e.target.id, e.target.value);
    };

    // 入力が変化したとき(ドロップダウン)
    const handleDropdownChange = (e, data) => {
        console.log(data);
        setInputValue(data.id, data.value);
    };

    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8} textAlign="left">
                        <Header as='h3'>
                            ユーザーステータス
                            <Header.Subheader>
                            ユーザーの登録情報を確認・編集します。
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                
            <Table basic='very'>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell className='bold'>メールアドレス</Table.Cell>
                        <Table.Cell><Input disabled defaultValue={email}/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className='bold'>表示名</Table.Cell>
                        <Table.Cell><Input id='display_name' placeholder={username} defaultValue={username} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className='bold'>Discord ID <Icon name='discord'/></Table.Cell>
                        <Table.Cell><Input id='discord_id' placeholder={discord_id} defaultValue={discord_id} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell><b>Minecraft アカウント</b></Table.Cell>
                        <Table.Cell>
                            {/* Minecraftアカウント情報は、テーブル内に別テーブルで表示 */}
                            <Table basic="very">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={3}>ユーザー名</Table.HeaderCell>
                                        <Table.HeaderCell width={5}>プラットフォーム</Table.HeaderCell>
                                        <Table.HeaderCell width={3} textAlign='center'>優先接続権</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {mc_accounts.length === 0 ? (
                                        <></>
                                    ):(
                                        mc_accounts.map((item, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{item['mcid']}</Table.Cell>
                                            <Table.Cell><p className='capitalize-first-letter'>{item['edition']} Edition</p></Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                {item['priority_access'] ? (
                                                    <Icon name='check' size='large' color='green'/>
                                                ):(
                                                    <Icon name='cancel' size='large' color='red'/>
                                                )}
                                            </Table.Cell>
                                        </Table.Row>
                                    )))}
                                    
                                    {/* Minecraftアカウント新規登録部 */}
                                    <Table.Row>
                                        <Table.Cell><Input id='new_mc_account_name' onChange={handleInputChange}/></Table.Cell>
                                        <Table.Cell>
                                            <Dropdown
                                                search
                                                selection
                                                options={EDITION_SELECT}
                                                id='new_mc_account_edition'
                                                onChange={handleDropdownChange}
                                            />
                                        </Table.Cell>
                                        <Table.Cell/>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <br />
            <Grid>
                <Grid.Row>
                    {/* 保存ボタン */}
                    <SaveButton state={state} setStateItem={setStateItem} inputValue={inputValue}/>
                    {/* キャンセルボタン */}
                    <Button negative style={{'margin': '0 20px 10px 20px'}} onClick={() => navigate("..")}>キャンセル</Button>
                </Grid.Row>
            </Grid>
        </div>
    );
}