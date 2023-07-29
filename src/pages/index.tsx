import dynamic from 'next/dynamic'

const Home = dynamic(() => import('./dashboard'), { ssr: false })

export default Home
