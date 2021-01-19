import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Авто Платформ</Navbar.Brand>
                    </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=''>
                <Nav className="">
                    <NavDropdown title="Танилцуулга" id="basic-nav-dropdown">
                    <LinkContainer to='/evaluation'>
                        <NavDropdown.Item>Үнэлгээ</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/lising'>
                    <NavDropdown.Item>Лизинг</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/insurance'>
                    <NavDropdown.Item>Даатгал</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/location'>
                    <NavDropdown.Item>Байршил  <i class="fas fa-map-marker-alt"></i></NavDropdown.Item>
                    </LinkContainer>
                    </NavDropdown>
                </Nav> 
                <Route render={({ history }) => <SearchBox history={history} />} />
                <Nav className="ml-auto">
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Гарах</NavDropdown.Item>
                        </NavDropdown>
                    ) : <LinkContainer to='/login'>
                    <Nav.Link>Нэвтрэх  <i class="fas fa-user"></i></Nav.Link>
                    </LinkContainer>}
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Хэрэглэгчид</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/carlist'>
                            <NavDropdown.Item>Машинууд</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
