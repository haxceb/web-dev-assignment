import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtistCard from '../../Components/Artist-Card'
import EventCard from '../../Components/Event-Card'
import { getArtistsEvents } from '../../apis/artists-apis'
import {
  Typography,
  CircularProgress,
  Stack,
  Container,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addDataIntoCache, getSingleCacheData } from '../../apis/caching-data'

const EventListingPage = () => {
  const params = useParams()
  const [eventDetails, setEventDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [artistData, setArtistData] = useState({})
  let navigate = useNavigate()

  const fetchArtistsEvents = async () => {
    setIsLoading(true)
    let artistName = params?.artistName
    const cachedResponse = await getSingleCacheData(
      'Artist',
      `/events/${params?.artistName}`
    )
    const clickedArtist = await getSingleCacheData(
      'Artist',
      `/${params?.artistName}`
    )
    if (Object.keys(clickedArtist).length !== 0) {
      setArtistData(clickedArtist)
    } else navigate('/')
    if (cachedResponse?.length > 0) {
      setEventDetails(cachedResponse)
      setIsLoading(false)
    } else {
      const events = await getArtistsEvents({ artistName })
      if (!events?.hasError) {
        setEventDetails(events?.data)
        addDataIntoCache(
          'Artist',
          `/events/${params?.artistName}`,
          events?.data
        )
        setIsLoading(false)
      } else setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArtistsEvents()
  }, [])

  return (
    <Container disableGutters={{ sm: true, lg: false }}>
      <Box marginTop={2} marginBottom={3}>
        <Typography
          component='a'
          variant='h5'
          color='text.secondary'
          fontWeight='bold'
          href='/'
          style={{ textDecoration: 'none' }}
          role='back-btn'
        >
          {`< Back to results`}
        </Typography>
      </Box>
      <ArtistCard
        artistName={artistData?.artistName}
        artistFbURL={artistData?.artistFbURL}
        artistImage={artistData?.artistImage}
      />
      <div>
        <Typography
          component='div'
          variant='h5'
          color='text.secondary'
          fontWeight='bold'
          marginTop={10}
          marginBottom={3}
        >
          {`${eventDetails?.length} upcoming events `}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={isLoading && 'center'}
          // spacing={3}
          alignItems={{ xs: 'center' }}
          gap={2}
          flexWrap='wrap'
        >
          {isLoading ? (
            <CircularProgress color='inherit' />
          ) : (
            eventDetails?.map(event => {
              return (
                <EventCard venue={event?.venue} eventDate={event?.datetime} />
              )
            })
          )}
        </Stack>
      </div>
    </Container>
  )
}

export default EventListingPage
