import useSWR from 'swr'
import Link from 'next/link'
import {Button, Card } from 'react-bootstrap'
import Error from 'next/error';
const fetcher = (url) => fetch(url).then((res) => res.json()); 

export default function ArtworkCard(props) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`, fetcher)
    
    if(error) return (<Error statusCode={404} /> )
    if(!data) return null

    return(
        <Card style={{ width: '18rem' }}>
            {(data.primaryImageSmall) ? <Card.Img variant="top" src={data.primaryImageSmall} /> : <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d" />}
            <Card.Body>
              {data.title && <Card.Title>{data.title}</Card.Title>}
              {!data.title && <Card.Title>N/A</Card.Title>}
              <Card.Text>
                Date : {(data.objectDate) ? data.objectDate : "N/A"}
                Classification : {(data.classification) ? data.classification : "N/A"}
                Medium : {(data.medium) ? data.medium : "N/A"}
              </Card.Text>
            </Card.Body>
            <Link passHref href={`/artwork/${props.objectID}`}>
                <Button variant='primary'>
                    {props.objectID}
                </Button>
            </Link>
          </Card>
    );
}