import { useParams } from 'react-router-dom';
import MyStatusTab from './tabs/MyStatusTab.js';

export default function StoreSections({state, setStateItem}){
    const { section } = useParams();

    switch (section) {
        case 'top':
            // トップタブ
            return <p>Topページ 準備中</p>;
        case 'my_status':
            // ユーザーステータスタブ
            return <MyStatusTab state={state} setStateItem={setStateItem} />;
        case 'store':
            // ストアタブ
            return <p>Storeページ 準備中</p>;
        default:
        return <p>Section not found</p>;
    }
}