import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

export function clearLocalStorage () {
  return localStorage.clear()
}

export function setBookObject (bookName, key, value) {
  let book = getLocalStorage(`${bookName}-info`) || {}
  book[key] = value
  setLocalStorage(`${bookName}-info`, book)
}

export function getBookObject (bookName, key) {
  let book = getLocalStorage(`${bookName}-info`)
  if (book) {
    return book[key] || null
  } else {
    return null
  }
}

export function getFontFamily (bookName) {
  return getBookObject(bookName, 'fontFamily')
}

export function setFontFamily (bookName, font) {
  return setBookObject(bookName, 'fontFamily', font)
}

export function getLocale () {
  return getLocalStorage('locale')
}

export function setLocale (locale) {
  return setLocalStorage('locale', locale)
}

export function getLocation (bookName) {
  return getBookObject(bookName, 'location')
}

export function setLocation (bookName, location) {
  setBookObject(bookName, 'location', location)
}

export function getBookmark (bookName) {
  return getBookObject(bookName, 'bookmark')
}

export function setBookmark (bookName, bookmark) {
  setBookObject(bookName, 'bookmark', bookmark)
}

export function getReadTime (bookName) {
  return getBookObject(bookName, 'time')
}

export function setReadTime (bookName, theme) {
  setBookObject(bookName, 'time', theme)
}

export function getProgress (bookName) {
  return getBookObject(bookName, 'progress')
}

export function setProgress (bookName, progress) {
  setBookObject(bookName, 'progress', progress)
}

export function getNavigation (bookName) {
  return getBookObject(bookName, 'navigation')
}

export function setNavigation(bookName, navigation) {
  setBookObject(bookName, 'navigation', navigation)
}

export function getMetadata (bookName) {
  return getBookObject(bookName, 'metadata')
}

export function setMetadata (bookName, metadata) {
  setBookObject(bookName, 'metadata', metadata)
}

export function getCover (bookName) {
  return getBookObject(bookName, 'cover')
}

export function setCover (bookName, cover) {
  setBookObject(bookName, 'cover', cover)
}

export function getTheme (bookName) {
  return getBookObject(bookName, 'theme')
}

export function setTheme (bookName, theme) {
  setBookObject(bookName, 'theme', theme)
}

export function getFontSize (bookName) {
  return getBookObject(bookName, 'fontSize')
}

export function setFontSize (bookName, fontSize) {
  setBookObject(bookName, 'fontSize', fontSize)
}
