import useSWR  from 'swr'
import { Error } from "next/error"
import {Button, Card} from 'react-bootstrap';
import { favouritesAtom } from '@/store';
import { test } from '@/store'
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

const ArtworkCardDetail = (props) => {
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [testt, setTestt] = useAtom(test)
    const [showAdded, setShowAdded] = useState(false)
    console.log(favourites)

    useEffect(()=>{
      setShowAdded(favourites?.includes(props.objectID))
    }, [favourites])
  

    async function favouritesClicked()  {
      if(showAdded) {
        setFavourites(await removeFromFavourites(props.objectID));
        setShowAdded(false)
      }
      else {
        setFavourites(await addToFavourites(props.objectID));
        setShowAdded(true)
      }
    } 

    const increase = () => {
      setTestt(testt + 1)
    }

    if(error) {
        return(<Error statusCode={404} />)
    }
    if(data) {
        return(
        <Card style={{ width: '18rem' }}>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
            <br></br>
            <Card.Body>
              {data.title && <Card.Title>{data.title}</Card.Title>}
              
              {!data.title && <Card.Title>N/A</Card.Title>}
              <Card.Text>
                {(data.objectDate) ? data.objectDate : "N/A"}
                <br></br>
                {(data.classification) ? data.classification : "N/A"}
                <br></br>
                {(data.medium) ? data.medium : "N/A"}
                <br/>
                <br/>
                {(data.artistDisplayLine) ? data.artistDisplayLine : "N/A"}
                <br></br>
                {(data.creditLine) ? data.creditLine : "N/A"}
                <br></br>
                {(data.dimensions) ? data.dimensions : "N/A"}
                <br></br>
                <Button variant={(showAdded) ? "primary" : "outline-primary"} onClick={favouritesClicked}>{(showAdded) ? "+ Favourite (show added)" : "+ Favourite"}</Button>
                <Button onClick={increase}>add</Button>
                {data.artistDisplayLine && <a href={artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}
              </Card.Text>
            </Card.Body>
          </Card>
        )
    }
    return(<></>)
}
 
export default ArtworkCardDetail;