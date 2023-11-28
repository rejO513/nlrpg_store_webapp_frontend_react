import React, { useState } from 'react';
import { Menu, Segment, Image, Icon } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';

import UserIconInNavMenu from './UserIconInNavMenu';

import './NavMenu.css';

function NavMenu({state, setStateItem}) {
  const { section } = useParams();
  const [activeItem, setActiveItem] = useState(section);
  // console.log(section);
  const navigate = useNavigate();

  const handleItemClick = (name) => {
    setActiveItem(name);
    switch (name){
      case 'top':
        navigate('/top');
        break;
      case 'my_status':
        navigate('/my_status');
        break;
      case 'store':
        navigate('/store');
        break;
    }
  };

  return (
    <Segment inverted>
      <Menu inverted pointing secondary className='nav_menu'>
        <Menu.Item
          name='top'
          active={activeItem === 'top'}
          onClick={() => handleItemClick('top')}
        >
          <Icon name='moon' />
          トップ
        </Menu.Item>
        <Menu.Item
          name='my status'
          active={activeItem === 'my_status'}
          onClick={() => handleItemClick('my_status')}
        >
          <Icon name='info' />
          ステータス
        </Menu.Item>
        <Menu.Item
          name='store'
          active={activeItem === 'store'}
          onClick={() => handleItemClick('store')}
        >
          <Icon name='shop' />
          ストア
        </Menu.Item>
        <Menu.Menu position='right'>
            <UserIconInNavMenu state={state} setStateItem={setStateItem}/>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
}

export default NavMenu;