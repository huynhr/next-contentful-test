import { useRouter } from 'next/router'
import Link from 'next/link'
const contentful = require('contentful')

const client = contentful.createClient({
  space: 'h0jo0a4gjbp4',
  accessToken: 'ofYKTmB5mZfHUtogBcMizRbbFU8TV7RG1v8AQm2e84w'
})

const entryId = '5fzdnTRcQJoaCbLLRMnBVU'

const TestPage = (props) => {
  const router = useRouter()
  /**
   * get a list of pages from contentful
   * find the matching url to page name
   * look up the page entry and display info
   */
  console.log('props', props)
  console.log('router', router)

  return (
    <React.Fragment>
      <p>TestPage: {router.asPath}</p>
      <Link href='/'><a>Go Home</a></Link>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  console.log('context', context.params)
  const entry = await client.getEntry(entryId)
  
  return {
    props: {
      entry
    }
  }
}

export default TestPage
