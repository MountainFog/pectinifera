import defaultSettings from '@/settings'

const title = defaultSettings.title || '飞天云课堂'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
