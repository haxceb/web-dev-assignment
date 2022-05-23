const apiDomain = 'https://rest.bandsintown.com'

export const ENDPOINTS = {
  GET: {
    getArtists: artistName => `${apiDomain}/artists/${artistName}`,
    getEvents: artistName => `${apiDomain}/artists/${artistName}/events`
  }
}
