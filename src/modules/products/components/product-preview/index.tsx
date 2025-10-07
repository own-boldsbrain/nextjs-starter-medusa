import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group"
      data-testid={`product-link-${product.handle}`}
    >
      <div data-testid={`product-wrapper-${product.handle}`}>
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          data-testid={`product-thumbnail-${product.handle}`}
        />
        <div className="flex txt-compact-medium mt-4 justify-between" data-testid={`product-info-${product.handle}`}>
          <Text className="text-ui-fg-subtle" data-testid={`product-title-${product.handle}`}>
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2" data-testid={`product-price-${product.handle}`}>
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
