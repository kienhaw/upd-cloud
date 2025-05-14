import React, { Fragment } from 'react';
import { Button, Image, Tooltip } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  useTranslate,
  useTranslateDispatch,
  useTranslateState
} from '../../../translate';
import MalaysiaFlag from '../../../assets/img/malay.svg';
import USAFlag from '../../../assets/img/engl.svg';
import CNFlag from '../../../assets/img/cn.svg';

function LanguageSwitcher() {  
  // const { language } = useTranslateState(); // we get the current language
  const i18n = useTranslate(); // we get the utils functions
  const { t, getLanguages } = i18n;
  const dispatch = useTranslateDispatch();

  const flag = (lang) => {
    let selFlag = '';

    switch (lang) {
      case 'en':
        selFlag = USAFlag;
        break;
      case 'ms':
        selFlag = MalaysiaFlag;
        break;
      case 'cn':
        selFlag = CNFlag;
        break;
      default:
        break;
    }
    return selFlag;
  }
  
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          className='extra-margin0'
          extra={
            getLanguages().map((key, index) => (
              <Tooltip title={key == "cn" ? "中文" : "English"} key={`btn-${index}`}>
                <Button
                  type="text"
                  className="h-auto p-0"
                  onClick={
                    (e) => {
                      dispatch({ type: 'CHANGE_LANGUAGE', language: key });
                      localStorage.setItem('lang', key);
                    }
                  }
                >
                  <Image width={32} src={flag(key)} preview={false} />
                </Button>
              </Tooltip>
            ))
          }
        />
      </div>
    </>
  );
}

export default LanguageSwitcher;