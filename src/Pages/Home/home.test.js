/* eslint-disable no-unused-expressions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import { act } from 'react-dom/test-utils'
import Home from '../Home'
import axiosMock from 'axios'
import { render, fireEvent, screen } from '@testing-library/react'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe.only('Test Event Listing Page', () => {

  beforeAll(() => {
    const testUrl = `${window.location}/`
    window.history.pushState({}, 'Test Title', testUrl)
  })
  
  test('search input value and axios function call', async () => {
    // const testUrl = `${window.location}/`
    // window.history.pushState({}, 'Test Title', testUrl)
    render(<Home />)
    let searchTerm = 'Amir'
    const searchInput = screen.getByPlaceholderText('Search artist')
    fireEvent.change(searchInput, { target: { value: searchTerm } })

    expect(searchInput.value).toBe('Amir')
  })

  test('axios function call on pressing enter', async () => {
    // const testUrl = `${window.location}/`
    // window.history.pushState({}, 'Test Title', testUrl)
    render(<Home />)
    let searchTerm = 'Amir'
    const searchInput = screen.getByPlaceholderText('Search artist')
    fireEvent.change(searchInput, { target: { value: searchTerm } })
    axiosMock.get.mockResolvedValueOnce({
      data: {
        artist_optin_show_phone_number: false,
        facebook_page_url: 'http://www.facebook.com/580571262037389',
        id: '20357',
        image_url: 'https://photos.bandsintown.com/large/8231335.jpeg',
        links: [{ type: 'website', url: 'http://www.amirofficiel.com' }],
        mbid: '5dd0c8e8-68aa-4c4e-b686-3f77c574602a',
        name: 'Amir',
        options: { display_listen_unit: false },
        support_url: '',
        thumb_url: 'https://photos.bandsintown.com/thumb/8231335.jpeg',
        tracker_count: 20080,
        tracking: [],
        upcoming_event_count: 36,
        url: 'https://www.bandsintown.com/a/20357?came_from=267&app_id=abc'
      }
    }),
      await act(async () => {
        fireEvent.keyDown(searchInput, {
          key: 'Enter',
          code: 'Enter',
          charCode: 13
        })
      })

    expect(axiosMock.get).toHaveBeenCalledTimes(1)

    const resultsHeading = screen.getByRole('heading', { name: /results/i })
    expect(resultsHeading).toBeInTheDocument()

    const artistCard = screen.getByRole('artistcard')
    expect(artistCard).toBeInTheDocument()
  })

  test('click the search button', () => {
    // const testUrl = `${window.location}/`
    // window.history.pushState({}, 'Test Title', testUrl)
    render(<Home />)

    const searchInput = screen.getByPlaceholderText('Search artist')
    fireEvent.change(searchInput, { target: { value: 'Amir' } })

    expect(searchInput.value).toBe('Amir')

    const searchButton = screen.getByRole('button', { name: /search/i })

    expect(searchButton).toBeInTheDocument()
  })
})
