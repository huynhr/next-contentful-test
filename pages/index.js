import Head from 'next/head'
import Link from 'next/link'
import components from '../components/index'
const contentful = require('contentful')

const client = contentful.createClient({
  space: 'h0jo0a4gjbp4',
  accessToken: 'ofYKTmB5mZfHUtogBcMizRbbFU8TV7RG1v8AQm2e84w'
})

/**
 * Now that question remains, how do dynamically render a page?
 */
export default function Home({entries, assets}) { 

  const renderComponent = (componentEntry, i) => {
    if (components[componentEntry]) {
      const Component = components[componentEntry]
      return <Component key={i} />
    }
  }
  console.log(entries)
  const homePageEntry = entries.filter(entry => entry.fields.title['en-US'] === 'HomePage2')[0]

  return (
    <div className="container">
      <Head>
        <title>Test App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{homePageEntry.fields.title['en-US']}</h1>

        {
          Object.keys(homePageEntry.fields).map((field, i) => {
            const formattedField = field[0].toUpperCase() + field.slice(1)
            return renderComponent(formattedField, i)
          })
        }
      <ul>
        <li>
          <Link href='/'><a>Home</a></Link>
        </li>
        <li>
          <Link href='/testPage'><a>testPage</a></Link>
        </li>
      </ul>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const response = await client.sync({initial: true, resolveLinks: false})
  const entries = response.entries
  const assets = response.assets
  
  return {
    props: {
      entries,
      assets
    }
  }
}
