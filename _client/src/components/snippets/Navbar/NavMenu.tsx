import * as React from 'react';
import {Component} from 'react';
import {
    Collapse,
    Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink, UncontrolledDropdown,
} from "reactstrap";
import {Link, Switch, Route} from 'react-router-dom';
import "./navBar.css";
import {DisplayWhen} from '../../utility/DisplayWhen';
import "bootstrap/dist/css/bootstrap.css";

interface INavMenuState {
    collapsed: boolean;
}

export class NavMenu extends Component<{}, INavMenuState> {
    static displayName = NavMenu.name;

    constructor(props: any) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    public toggleNavbar(): void {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    public render(): React.ReactElement {
        return (
            <header>
                <Navbar
                    className="navbar-expand-md navbar-toggleable-md ng-white border-bottom box-shadow"
                    light
                >
                    <Container className="navbar-container">
                        <NavbarBrand tag={Link} to="/">
                            Arcake
                        </NavbarBrand>
                        <NavbarToggler
                            onClick={this.toggleNavbar}
                            className="mr-2"
                        />
                        <Collapse
                            className="d-md-inline-flex flex-md-row-reverse"
                            isOpen={!this.state.collapsed}
                            navbar
                        >
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/"
                                    >
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/creategame"
                                    >
                                        Create Game
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/joingame"
                                    >
                                        Join Game
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        How to Play
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={Link} to="/howtoplay/dronq">
                                            Dronq
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/howtoplay/intimacy">
                                            Intimacy
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        className="text-dark"
                                        to="/submitideas"
                                    >
                                        Submit Ideas
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Info
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={Link} to="/aboutus">
                                            About Us
                                        </DropdownItem>
                                        <DropdownItem tag={Link} to="/impressum">
                                            Impressum
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Support Us
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem tag={Link} onClick={() => {
                                            window.open('https://www.instagram.com/project.arcake/');
                                        }}>
                                            Instagram
                                        </DropdownItem>
                                        <DropdownItem tag={Link} onClick={() => {
                                            window.open('https://www.paypal.com/paypalme/projectarcake/');
                                        }}>
                                            Donate
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
