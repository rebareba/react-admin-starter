import axios from 'axios'

export default function request(option = {}) {
  return async (optionData) => {
    const options = {
      url: '',
      method: 'GET',
      showError: option.showError !== false,
      timeout: option.timeout || 60 * 1000,
      action: option.action,
      ...optionData,
      headers: {'X-Requested-With': 'XMLHttpRequest', ...option.headers, ...optionData.headers},
    }
    // 简单请求处理
    if (options.data) {
      if (typeof options.data === 'object') {
        Object.keys(options.data).forEach((key) => {
          if (key[0] === ':' && options.data) {
            options.url = options.url.replace(key, encodeURIComponent(options.data[key]))
            delete options.data[key]
          }
        })
      }
      if ((options.method || '').toLowerCase() === 'get' || (options.method || '').toLowerCase() === 'head') {
        options.query = Object.assign(options.data, options.query)
      } else {
        options.body = Object.assign(options.data, options.body)
      }
    }
    // 路由参数处理
    if (typeof options.params === 'object') {
      Object.keys(options.params).forEach((key) => {
        if (key[0] === ':' && options.params) {
          options.url = options.url.replace(key, encodeURIComponent(options.params[key]))
        }
      })
    }
    // query 参数处理
    if (options.query) {
      const paramsArray = []
      Object.keys(options.query).forEach((key) => {
        if (options.query[key] !== undefined) {
          paramsArray.push(`${key}=${encodeURIComponent(options.query[key])}`)
        }
      })
      if (paramsArray.length > 0 && options.url.search(/\?/) === -1) {
        options.url += `?${paramsArray.join('&')}`
      } else if (paramsArray.length > 0) {
        options.url += `&${paramsArray.join('&')}`
      }
    }
    if (option.log) {
      option.log('request  options', options.method, options.url)
      option.log(options)
    }
    if (options.headers['Content-Type'] === 'application/json' && options.body && typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body)
    }
    let retData = {success: false}
    // mock 处理
    if (options.mock) {
      retData = await new Promise((resolve) =>
        setTimeout(() => {
          // TODO mock数据被改变的问题
          resolve(options.mock)
        }, option.delay || 500),
      )
    } else {
      try {
        const opts = {
          url: options.url,
          baseURL: options.baseURL,
          params: options.params,
          method: options.method,
          headers: options.headers,
          data: options.body,
          timeout: options.timeout,
        }
        const {data} = await axios(opts)
        retData = data
      } catch (err) {
        retData.success = false
        retData.message = err.message
        if (err.response) {
          retData.status = err.response.status
          retData.content = err.response.data
          retData.message = `浏览器请求非正常返回: 状态码 ${retData.status}`
        }
      }
    }

    // 自动处理错误消息
    if (options.showError && retData.success === false && retData.message && option.message) {
      option.message.error(retData.message)
    }
    // 处理Action
    if (options.action) {
      options.action(retData)
    }
    if (option.log && options.mock) {
      option.log('request response:', JSON.stringify(retData))
    }
    if (option.throwError && !retData.success) {
      const err = new Error(retData.message)
      err.code = retData.code
      err.content = retData.content
      err.status = retData.status
      throw err
    }
    return retData
  }
}
