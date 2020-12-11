import React, { Fragment } from 'react';
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
} from 'react-switch-lang';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';
import pt from '../../../assets/i18n/pt.json';
import fr from '../../../assets/i18n/fr.json';

setTranslations({ en, es, pt, fr });
setDefaultLanguage('en');
setLanguageCookie();

const Language = () => {
    const handleSetLanguage = (key) => {
        setLanguage(key);
    };
    return (
        <Fragment>
            <div>
                <ul className="language-dropdown onhover-show-div p-20">
                    <li onClick={() => handleSetLanguage('en')}>
                        <a href="#javascript" data-lng="en">
                            <i className="flag-icon flag-icon-is"></i> English
                        </a>
                    </li>
                    <li onClick={() => handleSetLanguage('es')}>
                        <a href="#javascript" data-lng="es">
                            <i className="flag-icon flag-icon-um"></i> Spanish
                        </a>
                    </li>
                    <li onClick={() => handleSetLanguage('pt')}>
                        <a href="#javascript" data-lng="pt">
                            <i className="flag-icon flag-icon-uy"></i> Portuguese
                        </a>
                    </li>
                    <li onClick={() => handleSetLanguage('fr')}>
                        <a href="#javascript" data-lng="fr">
                            <i className="flag-icon flag-icon-nz"></i> French
                        </a>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};


export default translate(Language);