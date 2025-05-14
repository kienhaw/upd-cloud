import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Menu, Typography, Card, Badge } from 'antd';
import {
  DashboardIcon2,
  FacultyIcon,
  ProgrammeIcon,
  FormsIcon,
  LetterIcon,
  CalendarIcon,
  ScholarshipIcon,
  OverviewIcon,
  ApplicationsIcon,
  StudentsIcon,
  RequestIcon,
  ModuleIcon,
  UserIcon,
  ClockIcon,
  ReportsIcon,
  SetupIcon,
  MaterialsIcon,
  PublicationsIcon,
  GrantsIcon,
  ClassroomIcon,
  TransactionIcon,
  PolicyIcon,
  AdvancementIcon,
  TaskIcon,
  StaffIcon,
  IncentiveIcon,
  LppaIcon,
  LppaAdminIcon,
  ShortCourseIcon,
  CatalogueIcon,
  FilterIcon,
  ContactIcon
} from '../../atoms/CustomIcons';
import { Link, useLocation } from 'react-router-dom';
import RoutingList from '../../../routing/config/RoutingList';
import { allowedCheck, allowedRoutes } from '../../../routing/config/utils';
import { useDispatch, useSelector } from 'react-redux';
import AllRoles from '../../../routing/config/AllRoles';
import { checkPermission } from '../../../routing/config/utils';
import { useResponsiveState } from '../../contexts/ResponsiveContext';

const { SubMenu } = Menu;
const IconList = {
  DashboardIcon2,
  ApplicationsIcon,
  FacultyIcon,
  ProgrammeIcon,
  RequestIcon,
  FormsIcon,
  LetterIcon,
  CalendarIcon,
  ReportsIcon,
  ScholarshipIcon,
  IncentiveIcon,
  OverviewIcon,
  UserIcon,
  ModuleIcon,
  StudentsIcon,
  ClockIcon,
  SetupIcon,
  MaterialsIcon,
  PublicationsIcon,
  GrantsIcon,
  ClassroomIcon,
  TransactionIcon,
  PolicyIcon,
  AdvancementIcon,
  TaskIcon,
  StaffIcon,
  LppaIcon,
  LppaAdminIcon,
  ShortCourseIcon,
  CatalogueIcon,
  FilterIcon,
  ContactIcon
};

export default (props) => {
  const [menuList, setMenuList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const company = localStorage.getItem("organization_name");
  const subkey = location.split('/')[1];
  const pathKey = location.split('/')[2];
  const { menuname } = props;
  const [selectedMenu, setSelectedMenu] = useState();
  const menuStats = useSelector((state) => state.global.menuStats);
  const {isMobile} = useResponsiveState();

  const selected = () => {
    let temp = location.split('/').length >= 3 ? (/^[0-9]*$/.test(pathKey) ? subkey : pathKey) : subkey;

    if(subkey == "customers") {
      temp = subkey;
    }

    if(["add", "edit"].includes(temp)) {
      temp = location.split('/')[1]
    }

    if (["recharge", "history"].includes(temp)) {
      // submenu path let it be
      temp = temp;
    } else {
      temp = `/${temp}`;
    }

    return [temp];
  }

  useEffect(() => {
    setSelectedMenu(selected);
  }, [location]);

  const openKeys = () => {
    let temp = [`/${subkey}`]
    return temp;
  }

  useEffect(() => {
    if (menuname && defaultList.length > 0) {
      const filteredMenu = defaultList.filter(x => 
        x.name.filter(
          y => y.toLowerCase().includes(menuname.toLowerCase())).length > 0
      ).map(z => z.children?.length ? 
        ({...z, children: z.children.filter(item => item.name.toLowerCase().includes(menuname))})
        : z
      )

      setMenuList(filteredMenu)
    } else {
      ModifyJson(allowedRoutes(RoutingList));
    }
  }, [menuname]);

  const ModifyJson = (data) => {
    var result = data.reduce(function (r, a) {
      if (a.parent) {
        r[a['menu']] = r[a['menu']] || [];
        if (a.submenu) {
          r[a['menu']].push(a);
        } else {
          r[a['menu']] = a;
        }
      }
      return r;
    }, Object.create(null));

    let res = [];

    Object.entries(result).map(([key, val], index) => {
      let children = [];
      let parentIcon = '';
      if(Array.isArray(val)){
        val.map((item, i) => {
          let submenu = item.submenu;
          let count = 0;

          if(submenu === "Transfer Receive") {
            count = menuStats?.inventory?.transfer_count || 0;
            submenu = "Trans. Receive";
          }

          if(submenu === "Purchase Order") {
            count = menuStats?.inventory?.po_count || 0;
            submenu = "Purc. Order";
          }

          if (count == 0) {
            submenu = item.submenu;
          } else if (count >= 1) {
            if(count > 99) count = "99+"
            submenu = <span>{submenu} <Badge count={count} style={{ fontSize: "10px" }} className="bounce-animation" /></span>
          }

          children.push({
            key: item.key,
            icon: getIcon(item.icon),
            label: <Link to={item.path}>{submenu}</Link>,
            name: item.submenu
          })
        });
        parentIcon = val[0].parenticon;
      }
      let names = [];
      if (children.length > 0) {
        children.map(x => {
          names.push(x.name)
        })
      }
      names.push(key);

      let name = key;

      res.push(
        {
          key: `/${Array.isArray(val) ? val[0].key : val.key}`,
          icon: Array.isArray(val) ? getIcon(parentIcon) : getIcon(val.icon),
          label: Array.isArray(val) ? name : <Link to={val.path}> {name}</Link> ,
          children: children.length > 0 ? children : undefined,
          name: children.length > 0 ? names : [key]
        }
      )
    });

    setMenuList(res);
    setDefaultList(res);
  };
  
  const getIcon = (icon) => {
    const IconComp = IconList[icon];
    return <IconComp/>
  }

  return (
    <>
      <div className="demo-logo-vertical text-center text-white">
        <h3 className="mb-0">
          Billing
        </h3>
      </div>
      {!props.collapsed &&
        <div className="demo-logo-vertical text-center text-white company-name">
          { company }
        </div>
      }
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={selectedMenu}
        defaultOpenKeys={isMobile ? false : openKeys}
        className="main-menu"
        items={menuList}
        selectedKeys={selectedMenu}
      />
    </>
  );
};
