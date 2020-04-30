import Head from 'next/head'
import Link from 'next/link'
import { renderComponent } from '../lib/renderComponent'
import ContentfulHandler from '../lib/contentfulHandler'

/**
 * Now that question remains, how do dynamically render a page?
 */
export default function Home(props) { 

  console.log('props: ', props)

  return (
    <div className="container">
      <Head>
        <title>Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{props.data.title}</h1>

        {
          props.data.blocks.map((item, i) => {
            return renderComponent(item.fields.slug, i)
          })
        }
      <ul>
        <li>
          <Link href='/'><a>Home</a></Link>
        </li>
        <li>
          <Link href='/AboutUs'><a>About Us</a></Link>
        </li>
      </ul>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new ContentfulHandler()
  const response =  await client.getEntries('page', { name: 'slug', value: 'Home' })
  console.log('response: ', response)

  return {
    props: {
      data: response.items ? response.items[0].fields : []
    }
  }
}
