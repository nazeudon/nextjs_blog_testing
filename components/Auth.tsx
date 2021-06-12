import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'

const cookie = new Cookie()

const Auth: React.FC = () => {
  //関数の中でページ遷移を実行したい時
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/jwt/create/`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        //options以下のpathでcookieが有効になる
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        router.push('/')
      }
    } catch {
      setError('Login Error')
    }
  }

  const register = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/register/`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 201) login()
    } catch {
      setError('Registration Error')
    }
  }

  const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      register()
    }
  }

  return (
    <>
      <p className="text-3xl text-center">{isLogin ? 'Login' : 'Sign up'}</p>
      <form onSubmit={authUser} className="mt-8 space-y-3">
        <div>
          <input
            type="text"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="px-3 py-2 border border-gray-300"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <p
          data-testid="mode-change"
          onClick={() => {
            setIsLogin(!isLogin)
            setError('')
          }}
          className="flex flex-col items-center justify-center font-medium cursor-pointer hover:text-indigo-500"
        >
          change mode ?
        </p>
        <div className="flex flex-col items-center justify-center">
          <button
            disabled={!username || !password}
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 disabled:opacity-40 hover:bg-indigo-700 focus:outline-none"
          >
            {isLogin ? 'Login with JWT' : 'Create new user'}
          </button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </>
  )
}

export default Auth
