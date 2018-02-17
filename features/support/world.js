import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {onError} from 'apollo-link-error'
import {HttpLink} from 'apollo-link-http'
import {setWorldConstructor} from 'cucumber'
import config from './config'
import database from './database'
import getSchema from './getSchema'

let createApolloClient = async function () {
  const schema = await getSchema()
  const fragmentMatcher = new IntrospectionFragmentMatcher({
                                                             introspectionQueryResultData: schema
                                                           })
  const cache = new InMemoryCache({fragmentMatcher})
  const logAfterware = onError(({networkError}) => {
    if (networkError) console.log('Network error: ', networkError)
  })
  const httpLink = new HttpLink({uri: config.server.url})
  const client = new ApolloClient({
                                    link: logAfterware.concat(httpLink),
                                    cache: cache
                                  })
  return client
}

createApolloClient().then(apolloClient => {
  function CustomWorld () {
    this.client = apolloClient
    this.config = config
    this.db = database
    this.user = {
      user_id: '',
      password: ''
    }

    this.result = {
      error: null,
      data: null
    }
  }

  setWorldConstructor(CustomWorld)

})



