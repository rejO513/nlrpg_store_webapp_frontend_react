import { Button } from 'semantic-ui-react'

// ログアウトボタン
export default function LogoutButton({state, setStateItem}){
    
    const handleLogout = () => {
        localStorage.removeItem('userDetail');
        setStateItem('userDetail', null);
    }

    return (
        <Button negative onClick={handleLogout}>ログアウト</Button>
    );
}