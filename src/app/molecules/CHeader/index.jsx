import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Space,
  Button,
  Input,
  Select,
  Avatar,
  Dropdown,
  Typography,
  Menu,
  Card,
  Form,
  message,
  Image,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import userImage from '../../../assets/img/dummy-profile.png';
import { logout } from '../../../features/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchIcon, ChangePasswordIcon, UserIcon, LogOutIcon } from '../../atoms/CustomIcons';
import { Popup } from '../../atoms/Popup';
import PopupPassword from '../../modules/Application/components/PopupPassword';
import { onClear } from '../../modules/Application/ducks/actions';
import { useResponsiveState } from '../../contexts/ResponsiveContext';

const { Text } = Typography;

export default (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisisble] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const userProfile = localStorage.getItem('userImage');
  const { colorBgContainer, collapsed, setCollapsed, menuname, setMenuname } = props;
  const profile = useSelector((state) => state.profile.userProfile);
  const {isMobile}= useResponsiveState();

  useEffect(() => {
    setProfileImg(userProfile ? userProfile : userImage);
  }, []);

  useEffect(() => {
    if(profile && 'id' in profile) {
      if (profile?.photo_url) {
        setProfileImg(profile?.photo_url);
        localStorage.setItem("userImage", profile?.photo_url);
      } else {
        setProfileImg(userImage);
      }
    }
  }, [profile]);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(onClear());
    localStorage.clear();
    navigate('/login');
  };

  const popup = {
    closable: true,
    visibility: visible,
    content: <PopupPassword title="Change Password" onClose={() => setVisisble(false)} />,
    width: 410,
    onCancel: () => setVisisble(false),
  };

  const onChangeInputField = (e) => {
    if (e) {
      setMenuname(e.target.value);
    }
  };

  const items = [
    // {
    //   key: 'myprofile',
    //   label: (
    //     <Button onClick={() => navigate('/profile')} type="link" className="btn-link c-gray" icon={<UserIcon />}>
    //       My Profile
    //     </Button>
    //   )
    // },
    {
      key: 'cgpw',
      label: (
        <Button onClick={() => setVisisble(true)} type="link" className="btn-link c-gray" icon={<ChangePasswordIcon />}>
          Change Password
        </Button>
      )
    },
    {
      key: 'lgout',
      label: (
        <Button onClick={logoutHandler} type="link" className="btn-link c-gray" icon={<LogOutIcon />}>
          Logout
        </Button>
      )
    },
  ];

  return (
    <>
      <Row gutter={[0, 12]} align="middle" justify="end" wrap style={{ background: colorBgContainer}}>
        <Col span={isMobile ? 18 : 12}>
          <Space size={isMobile ? 5 : 15}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Input
              value={menuname}
              size="large"
              onChange={onChangeInputField}
              prefix={<SearchIcon />}
              className="search-input"
              placeholder="Search..."
              onKeyDown={onChangeInputField}
            />
          </Space>
        </Col>
        <Col span={isMobile ? 6 : 12} className="text-right p-1">
          <Dropdown className="userDropdown" menu={{ items }} placement="bottomRight">
            <Space size={10}>
              {!isMobile && 
              <>
                <Text style={{ textTransform: 'capitalize' }}>
                  {localStorage.getItem('userName')}
                </Text>
                <Text style={{ textTransform: 'capitalize' }}>
                  {`(${JSON.parse(localStorage.getItem('token'))?.role})`}
                </Text>
              </>}
              <Avatar className="userImage" size={60} src={profileImg} />
            </Space>
          </Dropdown>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
