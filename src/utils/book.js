export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY = [
  { fontName: 'Default', font: 'Times New Roman' },
  { fontName: 'Cabin', font: 'Cabin' },
  { fontName: 'Days One', font: 'Days One' },
  { fontName: 'Montserrat', font: 'Montserrat' },
  { fontName: 'Tangerine', font: 'Tangerine' }
]

export function themeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background': '#cecece'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000'
        }
      }
    }
  ]
}
export function setGlobalTheme (href) {
  let link = document.getElementById('globalTheme')
  if (link) {
    link.setAttribute('href', href)
  } else {
    link = document.createElement('link')
    link.setAttribute('id', 'globalTheme')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}

// export function removeGlobalTHeme () {
//   const link = document.getElementById('globalTheme')
//   if (link) link.parentNode.removeChild(link)
// }
