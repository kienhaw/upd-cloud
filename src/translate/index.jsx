import React, { useEffect, createContext, useContext, useReducer, useState } from 'react';

import {
  getCurrentLanguage,
  setCurrentLanguage,
  getFallbackLanguage,
  setFallbackLanguage,
  getLanguages,
  setLanguages,
  getTranslations,
  setTranslations,
  t
} from './Translate';

// Configuration
let defaultlang = localStorage.getItem('lang');
const { language, fallBacklanguage, languages } = {
  language: defaultlang || 'en',
  fallBacklanguage: 'en',
  languages: ['en', 'cn']
};

// Contexts
const TranslateContext = createContext();
const TranslateStateContext = createContext();
const TranslateDispatchContext = createContext();

// Reducers
function translateReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_LANGUAGE': {
      setCurrentLanguage(action.language);
      return { ...state, language: action.language };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Initial state
const initialState = {language}

// console.log('chekkk', initialState)

export const TranslateProvider = props => {
  const value = {
    getCurrentLanguage: props.getCurrentLanguage || getCurrentLanguage,
    setCurrentLanguage: props.setCurrentLanguage || setCurrentLanguage,
    getFallbackLanguage: props.getFallbackLanguage || getFallbackLanguage,
    setFallbackLanguage: props.setFallbackLanguage || setFallbackLanguage,
    getLanguages: props.getLanguages || getLanguages,
    setLanguages: props.setLanguages || setLanguages,
    getTranslations: props.getTranslations || getTranslations,
    setTranslations: props.setTranslations || setTranslations,
    t: props.t || t
  };
  const [state, dispatch] = useReducer(translateReducer, initialState);
  const [ready, setReady] = useState(false);

  // Init language properties
  useEffect(() => {
    if (!ready) {
      (async () => {
        await setCurrentLanguage(language);
        await setFallbackLanguage(fallBacklanguage);
        await setLanguages(languages);

        setReady(true)
      })();
    }
  }, [ready]);

  return (
    <TranslateContext.Provider value={value}>
      <TranslateStateContext.Provider value={state}>
        <TranslateDispatchContext.Provider value={dispatch}>
          {props.children}
        </TranslateDispatchContext.Provider>
      </TranslateStateContext.Provider>
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  // You can use the function of provider
  const context = useContext(TranslateContext);
  if (context === undefined) {
    throw new Error('useTranslate must be used within a TranslateProvider');
  }
  return context;
};

export const useTranslateState = () => {
  const context = useContext(TranslateStateContext);
  if (context === undefined) {
    throw new Error(
      'useTranslateState must be used within a TranslateProvider'
    );
  }
  return context;
};

export const useTranslateDispatch = () => {
  const context = useContext(TranslateDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useTranslateDispatch must be used within a TranslateProvider'
    );
  }
  return context;
};