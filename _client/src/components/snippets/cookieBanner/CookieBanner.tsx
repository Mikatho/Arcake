import CookieBanner from 'react-cookie-banner';
import './cookieBanner.css';
import React, {Component} from "react";

export class CookieBan extends Component<{}, any>{
    public render() {
        return(
            <>
                <CookieBanner
                    message="We are using cookies."
                    onAccept={() => {}}
                    cookie="UserAcceptedCookies" />
            </>
        );
    }
}