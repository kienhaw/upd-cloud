import { intersection } from 'lodash';
import { RoleList } from '../../configs/constantData';

export function userId() {
    if(isLoggedIn()) {
        return JSON.parse(localStorage.getItem('token'))?.userId;
    }else {
        return null;
    }
}

export function getFirstHasAccessPage() {
    const role = JSON.parse(localStorage.getItem('token'))?.role;
    let accessPath = '';

    if (role == RoleList.admin) {
      accessPath = '/users';
    } else {
      accessPath = '/accounts'
    }
    
    return accessPath;
  }


export function isLoggedIn() {
	return !! localStorage.getItem('token');
}

export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

function conversion() {
    if (!localStorage.getItem('access')){
        return [];
    }
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    roles.forEach((item) => {
        Object.entries(item).forEach(([k, v]) => {
            temp.push(v)
        })
    })
    return temp;
}

function conversion2() {
    if (!localStorage.getItem('access')) {
        return [];
    }
    const roles = JSON.parse(localStorage.getItem('access'));
    let temp = [];
    roles.forEach((item) => {
        Object.entries(item).forEach(([k, v]) => {
            Object.entries(v).forEach(([KEY, VAL]) => {
                if(KEY !== "" && (VAL['read'] == 1 || VAL['write'] == 1 || VAL['delete'] == 1)){
                    temp.push(KEY)
                }
            })
        })
    })
    return temp;
}

export function checkPermission(permissions) {
    const role = JSON.parse(localStorage.getItem('token'))?.role;
    return permissions.includes(role);
}

export function allowedRoutes(routes) {
    const role = JSON.parse(localStorage.getItem('token'))?.role;

    return routes.filter(({ permission }) => {
        if (!permission) return true;
        else if (!isArrayWithLength(permission)) return true;
        else return permission.includes(role);
    });
}

export function allowed(permissions) {
    const role = JSON.parse(localStorage.getItem('token'))?.role;
    return permissions.includes(role);
}

export function allowedCheck() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'audit' && key != 'internal_office') {
                bol = false;
            }
        })
    })        
    return bol;
    
}

export function allowedAudit() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'audit') {
                bol = false;
            }
        })
    })        
    return bol;
    
}

export function allowedFeed() {
    let permit2 =  conversion();
    let bol = true;
    permit2.map(x => {
        Object.entries(x).forEach(([key, val]) => {
            if (key != 'internal_office' && key != 'audit') {
                bol = false;
            }
        })
    })        
    return bol;
    
}