/* eslint-disable no-unused-expressions */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import { act } from 'react-dom/test-utils'
import Home from '../Home'
import axiosMock from 'axios'
import { render, fireEvent, screen } from '@testing-library/react'
import EventListingPage from './index'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe.only('Test Event Listing Page', () => {
  test('if back button is in the document', () => {
    const testUrl = `${window.location}/events/Amir`
    window.history.pushState({}, 'Test Title', testUrl)
    render(<EventListingPage />)

    const backButton = screen.getByRole('back-btn')
    expect(backButton).toBeInTheDocument()
  })

  test('if artist card is in the document', () => {
    const testUrl = `${window.location}/events/Amir`
    window.history.pushState({}, 'Test Title', testUrl)
    render(<EventListingPage />)

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
    })

    // const backButton = screen.getByRole('back-btn')
    // expect(backButton).toBeInTheDocument()
  })
})
