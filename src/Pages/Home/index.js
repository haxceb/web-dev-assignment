import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchInput from '../../Components/Search-Input'
import ArtistCard from '../../Components/Artist-Card'
import { useNavigate } from 'react-router-dom'
import { Typography, CircularProgress, Stack, Container } from '@mui/material'
import { getArtistsInformation } from '../../apis/artists-apis'
import './style.scss'
import { addDataIntoCache, getSingleCacheData } from '../../apis/caching-data'

const Home = props => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState(null)
  const [artistData, setartistData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  const handleChange = e => {
    if (e.target.value) {
      setSearchTerm(e.target.value)
    } else setSearchTerm('')
  }

  const handleSubmit = async e => {
    if (e.key === 'Enter' || e.type === 'mousedown') {
      setIsLoading(true)
      setSearchInput(searchTerm)
      const response = await getArtistsInformation({ searchTerm })
      if (!response?.hasError && !response?.data?.error) {
        /*
        Checking the data type of the response artist data, it is object right now, but according to the 
        design it can be array so if it is object then it will be converted into an array!
        */
        if (typeof response?.data === 'object') {
          setartistData([response?.data])
          addDataIntoCache('Artist', `/searchedData`, {
            searchTerm: searchTerm,
            resData: [response?.data]
          })
        } else {
          setartistData(response?.data)
          addDataIntoCache('Artist', `/searchedData`, {
            searchTerm: searchTerm,
            resData: response?.data
          })
        }
        setIsLoading(false)
      } else {
        setartistData([])
        setIsLoading(false)
      }
    }
  }

  const handleArtistClick = (artistName, artistFbURL, artistImage) => {
    let newArtistData = {
      artistName: artistName,
      artistFbURL: artistFbURL,
      artistImage: artistImage
    }
    addDataIntoCache('Artist', `/${artistName}`, newArtistData)
    navigate(`/events/${artistName}`)
  }

  useEffect(() => {
    const fetchCachedData = async () => {
      const response = await getSingleCacheData('Artist', '/searchedData')
      if (response?.resData?.length > 0) {
        setartistData(response?.resData)
        setSearchTerm(response?.searchTerm)
        setSearchInput(response?.searchTerm)
      }
    }
    fetchCachedData()
  }, [])

  return (
    <Container disableGutters={true} fixed className='search-page-wrapper'>
      <div className='search-input'>
        <SearchInput
          placeHolder='Search artist'
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>
      <div className='heading'>
        {searchInput && !isLoading && (
          <Typography variant='h6' color='text.secondary' name='results'>
            {`${artistData?.length} results found for "${searchInput}"`}
          </Typography>
        )}
      </div>
      {isLoading ? (
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <CircularProgress color='inherit' />
        </Stack>
      ) : (
        <Stack direction='row' spacing={2}>
          {artistData?.length > 0 &&
            artistData?.map(artist => {
              return (
                <ArtistCard
                  artistName={artist?.name}
                  artistFbURL={artist?.facebook_page_url}
                  artistImage={artist?.image_url}
                  handleArtistClick={handleArtistClick}
                />
              )
            })}
        </Stack>
      )}
    </Container>
  )
}

Home.propTypes = {}

export default Home
