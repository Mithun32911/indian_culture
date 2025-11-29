/* eslint-disable react-refresh/only-export-components */
import { createContext } from 'react';

export const LanguageContext = createContext({ language: 'en', setLanguage: () => {} });

export default LanguageContext;
