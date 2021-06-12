import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
/* components */
import Layout from '../../components/Layout'
/* lib */
import { getAllPostIds, getPostData } from '../../lib/fetch'
/* types */
import { POST } from '../../types/types'

const PostDetail: React.FC<POST> = ({
  title,
  content,
  username,
  tags,
  created_at,
}) => {
  return (
    <Layout title={title}>
      <div>
        {tags?.map((tag, i) => (
          <span
            className={`px-2 py-2 m-1 text-white rounded ${
              i === 0
                ? 'bg-blue-500'
                : i === 1
                ? 'bg-gray-500'
                : i === 2
                ? 'bg-green-500'
                : i === 3
                ? 'bg-yellow-500'
                : i === 4
                ? 'bg-indigo-500'
                : 'bg-gray-400'
            }`}
            key={tag.id}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <p className="m-10 text-xl font-bold">{title}</p>
      <p className="mx-10 mb-12">{content}</p>
      <p>{created_at}</p>
      <p className="mt-3">
        {'by '} {username}
      </p>
      <Link href="/">
        <div className="flex mt-12 cursor-pointer">
          <svg
            className="w-6 h-6 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <a data-testid="back-blog">Back to blog-page</a>
        </div>
      </Link>
    </Layout>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const post = await getPostData(ctx.params.id as string)

  return {
    props: {
      ...post,
    },
    revalidate: 3,
  }
}
