import * as React from 'react';
import {Component} from 'react';
import {NavMenu} from '../snippets/Navbar/NavMenu';
import {CookieBan} from '../snippets/cookieBanner/CookieBanner';
import 'semantic-ui-css/semantic.min.css';
import "../../css/shapes.css"
import {NewsBanner} from "../snippets/newsBanner/NewsBanner";

export class Layout extends Component {
    static displayName = Layout.name;

    public render(): React.ReactElement {
        return (
            <>
                <CookieBan/>

                <div className="background">
                    <div className="custom-shape-divider-top topshape">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path d="M1200 0L0 0 598.97 114.72 1200 0z">.</path>
                        </svg>
                    </div>
                    <div className="custom-shape-divider-top midshape">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path d="M1200 0L0 0 598.97 114.72 1200 0z">.</path>
                        </svg>
                    </div>
                    <div className="custom-shape-divider-top bottomshape">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path d="M1200 0L0 0 598.97 114.72 1200 0z">.</path>
                        </svg>
                    </div>
                </div>
                <div className="bodyContainer">
                    <div className="navbarContainer">
                        <NavMenu/>
                    </div>
                    <NewsBanner/>
                    <div className="contentContainer">{this.props.children}
                    </div>
                </div>
            </>
        );
    }
}
