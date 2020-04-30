const contentful = require('contentful')
const config = require('../config')

class ContentfulHandler {
  constructor() {
    this.client = contentful.createClient({
      space: config.space,
      accessToken: config.accessToken
    })
  }

  async getEntries(contentType, field={}) {
    const query = {
      content_type: contentType,
    }
    if (Object.keys(field).length) {
      query[`fields.${field.name}[in]`] = field.value
    }
    console.log('query: ', query)
    const response = await this.client.getEntries(query)
    return response
  }

}

export default ContentfulHandler
