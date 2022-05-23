import React from 'react'
import { Stack, CardContent, Typography, Avatar } from '@mui/material'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const ArtistCard = ({
  artistName = '',
  artistFbURL = 'www.facebook.com',
  artistImage = '',
  handleArtistClick = () => {}
}) => {
  let navigate = useNavigate()
  return (
    <Stack
      width={{ xs: '100%', md: '350px' }}
      direction={{ xs: 'column', sm: 'row' }}
      boxShadow='0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
      padding='20px'
      alignItems='center'
      bgcolor='white'
      borderRadius='4px'
      overflow='hidden'
      role='artistcard'
      noWrap
    >
      <Avatar
        alt='Artist Photo'
        src={artistImage || ''}
        sx={{ width: 80, height: 80 }}
      />
      <CardContent>
        <Typography
          sx={{
            // fontSize: 18,
            width: '200px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textAlign: { xs: 'center', sm: 'left' }
          }}
          variant='h5'
          color='text.secondary'
          onClick={() =>
            handleArtistClick(artistName, artistFbURL, artistImage)
          }
          noWrap={true}
        >
          {artistName || 'No Name'}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            width: '200px',
            cursor: 'pointer',
            textAlign: { xs: 'center', sm: 'left' }
          }}
          variant='h6'
          color='text.secondary'
          noWrap={true}
          onClick={() => navigate(`${artistFbURL || 'www.facebook.com'}`)}
        >
          {artistFbURL || 'www.facebook.com'}
        </Typography>
      </CardContent>
    </Stack>
  )
}

export default ArtistCard
