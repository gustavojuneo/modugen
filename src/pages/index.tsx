import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import styles from '../styles/Home.module.css'
import { getKeys } from '../utils/moduleGenerator/generateFile'

const Home: NextPage = () => {
  const [message, setMessage] = useState('');
  const [keys, setKeys] = useState<any>([]);
  const [data, setData] = useState<any>({} as any);

  const onClick = async () => {
    const response = await api.post('/generate', data)
    setMessage(response.data.message);
  }

  useEffect(() => {
    api.get('/modules/keys').then((response) => {
      setKeys(response.data.keys)
    });
  }, [])

  return (
    <div className={styles.container}>
      {keys.map((key: any, index: number) => (
        <input
          key={index}
          type="text" 
          name={key.name}
          onChange={({ target }) => {  
            setData((prevState: any) => ({ ...prevState, [target.name]: target.value })) 
          }} />
      ))}
      <button onClick={onClick}>Generate File</button>
      <span>{message}</span>
    </div>
  )
}

export default Home
