import React from 'react'
import {observer} from 'mobx-react-lite'
import './login.styl'

import bg from '@assets/image/bg.jpg'
import loginStore from './login-store'

const Login = observer(function Login() {
  // const [loginStore] = useState(new LoginStore())
  const {loading, message, mobile, password} = loginStore

  console.log('loginStore', loginStore)
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await loginStore.login()
  }
  return (
    <div className="loginMain" style={{backgroundImage: `url(${bg})`}}>
      <div className="formContainer cfb40">
        <div className="title mt30">登 录</div>
        <form className="mt30" onSubmit={handleSubmit}>
          <input
            name="mobile"
            type="text"
            value={mobile}
            placeholder="请输入手机号"
            onChange={(e) => loginStore.setMobile(e.target.value)}
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="请输入密码"
            onChange={(e) => loginStore.setPassword(e.target.value)}
          />
          <div className="mt20">
            <input className="submitButton" type="submit" value={loading ? '登录中...' : '登录'} />
          </div>
          <div className="errorMessage">{message}</div>
        </form>
      </div>
    </div>
  )
})

export default Login
