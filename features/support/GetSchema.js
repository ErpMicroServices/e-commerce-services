import 'isomorphic-fetch'
import config from './config'

export default async function getSchema () {
  const response = await fetch(config.server.url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
                           query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
                         }),
  })
  const json = await response.json()
  const schema = json.data
  return schema
}
