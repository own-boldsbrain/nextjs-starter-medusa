import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { ProfilerWrapper } from "@/lib/design-system/dev"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  try {
    // In development, use fixtures for static params
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs');
      const path = await import('path');

      const fixturesPath = path.join(process.cwd(), 'src/lib/fixtures/products.json');
      if (fs.existsSync(fixturesPath)) {
        const products = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8')) as any[];

        // Get country codes (simplified for now)
        const countryCodes = ['br']; // Default to Brazil

        return products.flatMap((product) =>
          countryCodes.map((countryCode) => ({
            countryCode,
            handle: product.handle,
          }))
        );
      }
    }

    // Fallback to original logic
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProfilerWrapper id="ProductPage">
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
      />
    </ProfilerWrapper>
  )
}
