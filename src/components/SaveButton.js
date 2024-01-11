import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import axios from "axios";

// ユーザーステータス編集画面での保存ボタン
export default function SaveButton ({state, setStateItem, inputValue}){

    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

    // ユーザー情報を更新
    const updateUser = async (email, username, discord_id, minecraft_accounts, image_url) => {
		return await axios
			.post(`${baseURL}/user-data-update/`, 
                {
                    username: username,
                    email: email,
                    discord_id: discord_id,
                    minecraft_accounts: minecraft_accounts,
                    image_url: image_url,
				},
			)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				console.log("Error Update User", err);
				const error_code = err.response.data;
				return { error_code };
			})
	}

    // 保存処理
    const handleSubmit = async () => {
        setStateItem('loading', true);

        const email = state.userDetail.email;
        let username = state.userDetail.username;
        let discord_id = state.userDetail.discord_id;
        let minecraft_accounts = [...state.userDetail.minecraft_accounts];
        const image_url = state.userDetail.image_url;

        if (inputValue.display_name){
            username = inputValue.display_name;
        }
        if (inputValue.discord_id){
            discord_id = inputValue.discord_id;
        }   
        if (inputValue.new_mc_account_name && inputValue.new_mc_account_edition){
            const new_account = {
                "mcid": inputValue.new_mc_account_name,
                "edition": inputValue.new_mc_account_edition,
            };
            minecraft_accounts.push(new_account);
        }
        
        
        console.log(minecraft_accounts);

        const response = await updateUser(email, username, discord_id, minecraft_accounts, image_url);

        // 更新が終了するまで、ロード画面を表示
        setStateItem('loading', false);
        if(response.error_code) {
            // 更新に失敗した場合は、現在のページに留まる
            return;
        }
        let newUserDetail = JSON.parse(JSON.stringify(state.userDetail));
        newUserDetail.username = username;
        newUserDetail.discord_id = discord_id;
        newUserDetail.minecraft_accounts = minecraft_accounts;
        setStateItem('userDetail', newUserDetail)
        navigate("..");
    };

    const preHandleSubmit = () => {
        console.log(inputValue);
        // 入力値の不正を検出(今後実装)
        
        handleSubmit();
    };

    return(
        <Button positive style={{'margin': '0 20px 10px 20px'}} onClick={preHandleSubmit}>保存</Button>
    );
    
}