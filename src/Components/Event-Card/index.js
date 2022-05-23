import { Card, Divider, Stack, Typography, Box } from '@mui/material'
import React from 'react'

const EventCard = ({ venue = '', eventDate }) => {
  const convertDate = date => {
    var newDate = new Date(date)
    newDate.toString('dd-MM-YYYY')
    return newDate
  }
  return (
    <Card sx={{ width: { xs: '97%', sm: '350px' }, padding: '5px' }}>
      <Typography
        component='div'
        variant='h5'
        color='text.secondary'
        fontWeight='bold'
        padding='10px 20px'
      >
        EVENT DETAILS
      </Typography>
      <Divider variant='middle' />

      <Stack
        direction='row'
        justifyContent='space-between'
        padding='10px 10px 20px 20px'
        flexWrap='wrap'
        // alignItems='center'
        // gap={2}
      >
        <Box width='50%' marginTop='10px'>
          <Typography
            component='div'
            variant='h5'
            color='text.secondary'
            fontWeight='bold'
          >
            Country
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            variant='h6'
            noWrap={true}
          >
            {venue?.country}
          </Typography>
        </Box>
        <Box width='50%' marginTop='10px' fontWeight='bold'>
          <Typography
            component='div'
            variant='h5'
            color='text.secondary'
            fontWeight='bold'
          >
            City
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            variant='h6'
            noWrap={true}
          >
            {venue?.city}
          </Typography>
        </Box>
        <Box width='50%' marginTop='10px'>
          <Typography
            component='div'
            variant='h5'
            color='text.secondary'
            fontWeight='bold'
          >
            Venue
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            variant='h6'
            noWrap={true}
          >
            {venue?.location}
          </Typography>
        </Box>
        <Box width='50%' marginTop='10px'>
          <Typography
            component='div'
            variant='h5'
            color='text.secondary'
            fontWeight='bold'
          >
            Date
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            variant='h6'
            noWrap={true}
          >
            {`${convertDate(eventDate)}`}
          </Typography>
        </Box>
      </Stack>
    </Card>
  )
}

export default EventCard
