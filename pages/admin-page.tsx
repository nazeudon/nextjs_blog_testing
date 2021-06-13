import Auth from '../components/Auth'
import Layout from '../components/Layout'

const adminPage: React.FC = () => {
  return (
    <Layout title="Admin">
      <Auth />
    </Layout>
  )
}

export default adminPage
