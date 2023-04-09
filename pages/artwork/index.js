import useSWR from 'swr'
import  { useRouter } from "next/router"
import {useState, useEffect } from 'react'
import {Pagination, Row, Col} from "react-bootstrap"
import Error from 'next/error'
import ArtworkCard from '../components/ArtworkCard'
import validObjectIDList from '@/public/data/validObjectIDList.json'
const PER_PAGE = 12

const fetcher = (url) => fetch(url).then((res) => res.json()); 

const Artwork = () => {
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const { data, error } = useSWR((`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`), fetcher)
    const [page, setPage] = useState(1)
    const [artworkList, setArtworkList] = useState([])

    const previous = () => {
        if(page > 1) {
            setPage(page - 1)
        }
    }

    const next = () => {
        if(page + 1 <= artworkList.length) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
        if(data) {
            let results = []
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results)
        }
      }, [data]);
    
    if(error) {
        return (<Error statusCode={404} />)
    }

    if(artworkList) {
        return (
            <>
            <Row className="gy-4">
                {(artworkList.length > 0) ? artworkList[page - 1].map(art => {
                    return <Col lg={3} key={art}><ArtworkCard objectID={art}></ArtworkCard></Col>
                }) : <h4>Nothing Here</h4>}
            </Row>
            {(artworkList.length > 0) ?  
            <Pagination>
                <Pagination.Prev onClick={previous}></Pagination.Prev>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={next}></Pagination.Next>
            </Pagination> : <></>}
            </>
        )
    }
    else {
        return (<></>)
    }
}
 
export default Artwork;

