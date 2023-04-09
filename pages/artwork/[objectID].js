import { useRouter } from "next/router"
import ArtworkCardDetail from "../components/ArtworkCardDetail";
import {Row, Col } from 'react-bootstrap'
const Art = () => {
    const router = useRouter();
    const { objectID } = router.query
    return ( 
    <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
    </Row>
    );
}

export default Art
 
