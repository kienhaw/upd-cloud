import { baseUrl } from '../configs/constants';
import axios from 'Services/axiosInterceptor';
import { message } from 'antd';

export const dummyRequest = (response) => {
  // console.log("check response", response);
  setTimeout(() => {
    response.onSuccess('ok');
  }, 0);
};

export const uniquiFileName = (name, cat) => {
  let replaceAbleKey = '';
  if(cat) {
    if (cat.includes('Proof of English')) {
      replaceAbleKey = `Proof_of_English_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;  
    } else {
      replaceAbleKey = `${cat.replaceAll(" ", "_")}_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;
    }
  } else {
    replaceAbleKey = `File_${Date.now() + String(Math.random().toString().slice(2, 4))}_${name}`;
  }
  return replaceAbleKey;
};

export const getFileName = (url) => {
  if (url) {
    var filename = url.substring(url.lastIndexOf('/') + 1);
    return filename;
  }
};

const readeFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

let uploadUrl = `marketing.api.uploadImageToken`;

export const getSingleUpload = async (name, type, file, doctype, code) => {
  const fileObj = await readeFile(file);
  const postJson = {
    doctype: doctype,
    docname: code,
    filename: name, // filename
    is_private: 0,
    docfield: type, // document or image
    cmd: 'uploadfile',
    from_form: 1,
    filedata: fileObj, // file object
  };
  try {
    let res = await axios.post(uploadUrl, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};

export const generateTree = (data) => {
  var dictonary = data.reduce((p, c) => {
    p[c.revision_no] = c;
    return p;
  }, {});
  var parentList2 = data.reduce(function (p, c) {
    if (c.revision_no_reference == null) {
      p.push(c);
    } else {
      if (!dictonary[c.revision_no_reference].children) {
        dictonary[c.revision_no_reference].children = [];
      }

      dictonary[c.revision_no_reference].children.push(c);
    }
    return p;
  }, []);
  return parentList2;
};

export const onBeforeUploadFile = (src, type, name, setValue, index, parent) => {
  if (type == 'image') {
    if (src.file.type != 'image/jpeg' && src.file.type != 'image/png') {
      message.error({ content: 'Only JPG & PNG files accepted', key: 'img' });
      setValue(name, '');
    }
  } else if (type == 'pdf') {
    if (src.file.type != 'application/pdf') {
      message.error({ content: 'Only pdf with max 10MB size file accepted', key: 'pdf' });
      parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
    } else {
      if (src.file.size / 1024 / 1024 > 10) {
        message.error({ content: 'Only pdf with max 10MB size file accepted', key: 'pdf' });
        parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
      }
    }
  } else  if (type == 'pdfimage') {
    if (src.file.type != 'application/pdf' && src.file.type != 'image/jpeg' && src.file.type != 'image/png') {
      message.error({ content: 'Only pdf with max 10MB size file or Image accepted', key: 'pdfimage' });
      parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
    } else {
      if (src.file.size / 1024 / 1024 > 10) {
        message.error({ content: 'Max 10MB size file accepted', key: 'pdfimage' });
        parent ? setValue(`${parent}[${index}].${name}`, '') : setValue(name, '');
      }
    }
  }
};

export const formatCurrency = (value, currency) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  let val = String(value);
  if(currency) {
    return `${company_currency} ${val}`;
  } else {
    return `${(parseFloat(val)).toFixed(2)}`;
  }
};

export const formatCurrencyOld = (value, currency) => {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  let val = String(value);
  if(currency) {
    return `${company_currency} ${(parseFloat(val)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d{1,2}))/g, ',')}`;
  } else {
    return `${(parseFloat(val)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/\.00$/, '')}`;
  }
};

let uploadUrlPrivate = `${baseUrl}/marketing.api.uploadImageToken?is_private=0`;

export const getSingleUploadPrivate = async (name, type, file, doctype, code) => {
  const fileObj = await readeFile(file);
  const postJson = {
    doctype: doctype,
    docname: code,
    filename: name, // filename
    is_private: 0,
    docfield: type, // document or image
    cmd: 'uploadfile',
    from_form: 1,
    filedata: fileObj, // file object
  };
  try {
    let res = await axios.post(uploadUrlPrivate, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};


export const getSignedURL = async (name, cat, file) => {
  let surl = `${baseUrl}/registry.api.upload_files_to_awss3`;
  let fildata = await readeFile(file)
  let baseFile = fildata.substr(fildata.indexOf(',') + 1);
  const postJson = {
    filename: name,
    filedata: baseFile,
    category: cat
  };
  try {
    let res = await axios.post(surl, postJson);
    return res.data.message;
  } catch (e) {
    console.log('Err', e);
    return false;
  }
};

export const uploadFile = async (fileinput, cat, ocat) => {
  let fileObj = null;
  if (fileinput.fileList[0].uid != '-1') {
    let modifiedName = uniquiFileName(fileinput?.file?.originFileObj.name, ocat ? ocat : cat);
    let res = await getSignedURL(
      modifiedName,
      cat,
      fileinput?.file?.originFileObj,
    );
    fileObj = { item: cat, attached_document: res?.filepath };
    return fileObj;
  } else {
    fileObj = {
      item: cat,
      attached_document: fileinput.fileList[0].url,
    };
    return fileObj;
  }
}

export const uploadFileV2 = async (file, allowedTypes = null) => {
  let paylod = new FormData();
  paylod.append("file", file);
  if(allowedTypes != null) {
    paylod.append("allowed_filetypes", allowedTypes);
    paylod.append("to_validate", "1");
  }

  let upurl = `${baseUrl}/files/upload-blob`;
  try {
    const resp = await axios({ method: 'post', url: upurl, data: paylod, headers: { "Content-Type": "multipart/form-data" } });
    console.log(resp)
    if(resp.code) {
      message.error(resp.data.message)
      return false
    }
    return resp.data;
  } catch (e) {
    return false;
  }
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const comma = (nStr) => {
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export const fuzzySearch = (query, target) => {
  // Convert both strings to lowercase for case-insensitive comparison
  query = query.toLowerCase();
  target = target.toLowerCase();

  const matrix = [];

  // Initialize the matrix with distances
  for (let i = 0; i <= query.length; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= target.length; j++) {
      matrix[i][j] = i === 0 ? j : 0;
    }
  }

  // Fill in the matrix with Levenshtein distances
  for (let i = 1; i <= query.length; i++) {
    for (let j = 1; j <= target.length; j++) {
      const cost = query[i - 1] === target[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  // Calculate the similarity score
  const similarity = 1 - matrix[query.length][target.length] / Math.max(query.length, target.length);

  return similarity;
}