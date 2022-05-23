import * as React from 'react'

// Function to add our give data into cache
export const addDataIntoCache = (cacheName, url, response) => {
  // Converting our response into Actual Response form
  const data = new Response(JSON.stringify(response))

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open(cacheName).then(cache => {
      cache.put(url, data)
      //   alert('Data Added into cache!')
    })
  }
}

// Function to get single cache data
export const getSingleCacheData = async (cacheName, url) => {
  if (typeof caches === 'undefined') return false

  const cacheStorage = await caches.open(cacheName)
  const cachedResponse = await cacheStorage.match(url)

  // If no cache exists
  if (!cachedResponse || !cachedResponse.ok) {
    return []
  }

  return cachedResponse.json()
}
