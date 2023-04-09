import { favouritesAtom } from "@/store"; 
import { useAtom } from "jotai";
import {Row, Col} from "react-bootstrap"
import ArtworkCard from './components/ArtworkCard'

const Favourites = () => {
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    console.log(favourites)
    if(!favourites) return null
    return ( 
        <Row className="gy-4">
            {(favourites.length > 0) ? favourites.map(art => {
                return <Col lg={3} key={art}><ArtworkCard objectID={art}></ArtworkCard></Col>
            }) : <h4>Nothing Here - Try adding some</h4>}
        </Row>  );
}
 
export default Favourites;