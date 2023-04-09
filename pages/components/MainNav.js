import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

const MainNav = () => {
  
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router  = useRouter()
  let token = readToken();

  function logout() {
    removeToken();
    router.push('/');
  }

  async function search(e) {
    console.log("reached")
    setIsExpanded(false)
    term = e.target.search.value
    if(term != '') {
      setSearchHistory(await addToHistory(`title=true&q=${term}`)) 
      router.push(`/artwork?title=true&q=${term}`)
    }
  }
  
  return (
    <>
    <Navbar className="fixed-top" bg="light" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>Nolan Smith</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {setIsExpanded(!isExpanded)}} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link legacyBehavior passHref href="/">
            <Nav.Link href="/" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link>
            </Link>
            { token && <Nav.Link href="/search" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link>}   
          </Nav>
        </Navbar.Collapse>
        {token && < Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success" onClick={(e) => {search(e)}}>Search</Button>
        </Form>}
        { token && <Nav className='me-auto'>
         <NavDropdown title={token.userName} id="basic-nav-dropdown">
              <NavDropdown.Item href="/favourites" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
              <NavDropdown.Item href="/history" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/history"}>History</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={() => {setIsExpanded(false), logout()}} active={router.pathname === "/"}>Logout</NavDropdown.Item>
            </NavDropdown> 
        </Nav>}
        {!token && <Nav className='me-auto'>
                <NavDropdown.Item href="/login" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/login"}>Login</NavDropdown.Item>
                <NavDropdown.Item href="/register" onClick={() => {setIsExpanded(false)}} active={router.pathname === "/register"}>Login</NavDropdown.Item>
        </Nav>}
      </Container>
    </Navbar>
    <br/>
    <br/>
    </>
  );
}

export default MainNav;