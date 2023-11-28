import React, { useEffect } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

import logo from "../../assets/images/logo.png";

import "./Store.css";

import NavMenu from "../../components/NavMenu.js";
import StoreSections from './StoreSections.js';

function Store({state, setStateItem}){

    useEffect(() => {
        // console.log('StorePage Loaded.');
    }, []);

    return(
        
        <div className="background">
            <div className="view">
                <img className="logo" src={logo}/>
                <Segment.Group>
                    {
                        // ロード画面をページ部に表示
                        state.loading ? (
                            <Dimmer active>
                                <Loader size='large'/>
                            </Dimmer>
                        ) : null
                    }   
                    {/* ナビゲーションメニュー */}
                    <NavMenu state={state} setStateItem={setStateItem}/>
                    {/* ページの本文 */}
                    <Segment tertiary>
                        <StoreSections state={state} setStateItem={setStateItem}/>
                    </Segment>
                </Segment.Group>
            </div>
        </div>
    );

}

export default Store;