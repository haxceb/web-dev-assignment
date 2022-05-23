import axios from 'axios'
import { ENDPOINTS } from './endpoints'

export const getArtistsInformation = async ({ searchTerm = '' }) => {
  var response = {}
  try {
    const res = await axios.get(ENDPOINTS.GET.getArtists(searchTerm), {
      params: {
        app_id: 'abc'
      },
      headers: {
        accept: 'application/json'
      }
    })

    response = {
      hasError: false,
      ...res
    }
  } catch (err) {
    response = {
      hasError: true,
      respone: err
    }
  }

  return response
}

export const getArtistsEvents = async ({ artistName = '' }) => {
  var response = {}
  try {
    const res = await axios.get(ENDPOINTS.GET.getEvents(artistName), {
      params: {
        app_id: 'abc'
      },
      headers: {
        accept: 'application/json'
      }
    })

    response = {
      hasError: false,
      ...res
    }
  } catch (err) {
    response = {
      hasError: true,
      respone: err
    }
  }

  return response
}
