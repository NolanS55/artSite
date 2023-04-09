/*********************************************************************************
*  BTI425 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Nolan S Student ID: 101664217 Date: 04-08-24
*
*  Vercel App (Deployed) Link: https://art-site-gamma.vercel.app/
*
********************************************************************************/ 

import {Image, Col, Row} from 'react-bootstrap'

export default function Home() {
  return (
    <>
    <Image fluid rounded src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="castle"></Image>
    <Row>
      <Col md={6}>The Metropolitan Museum of Art in New York City, colloquially &quotthe Met&quot,[a] is the largest art museum in the Americas and the most-visited museum in the Western Hemisphere. 
      Its permanent collection contains over two million works,[1] divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on 
      Manhattan&aposs Upper East Side, is by area one of the world&aposs largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, 
      The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
      </Col>
      <Col md={6}>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. 
      The museum&aposs permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, 
      and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. 
      The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. 
      Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
      </Col>
    </Row>
    <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Image Link</a>
    </>
  )
}
