import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { ProductEdge } from '../schema'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '../utils/normalize'
import { Product } from '@commerce/types'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )
  console.log('all products data: ', data)

  const products =
    data.products?.edges?.map(({ node: p }: ProductEdge) => {
      console.log('p: ', p)
      return normalizeProduct(p)
    }) ?? []

  return {
    products,
  }
}

export default getAllProducts
