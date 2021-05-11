import {Modal} from 'antd'

export default (title, content, type = 'error') => {
  if (!content) {
    content = title
    title = ''
  }
  Modal[type]({
    title,
    content,
  })
}
