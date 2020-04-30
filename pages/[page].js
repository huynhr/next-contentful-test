import Link from 'next/link'
import ContentfulHandler from '../lib/contentfulHandler'
import { renderComponent } from '../lib/renderComponent'

const TestPage = (props) => {

  console.log('props', props)
  const content = Object.keys(props.data).length ? (
    <React.Fragment>
      <h1>{props.data.title}</h1>
        {
          props.data.blocks.map((item, i) => {
            return renderComponent(item.fields.slug, i)
          })
        }
        <Link href='/'><a>Go Home</a></Link>
    </React.Fragment>
  ) : (<h1>404 Error</h1>)

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const client = new ContentfulHandler()
  const response = await client.getEntries('page', { name: 'slug', value: context.params.page })
  const item = response.items.length ? response.items[0].fields : {}
  return {
    props: {
      data: item,
      response
    }
  }
}

export default TestPage
