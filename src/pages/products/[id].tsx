import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/products'
import { GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: string
    defaultPriceId: string
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  const { id } = params

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60, // 1 hour
  }
}

export default function Product({ product }: ProductProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyProduct = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (e) {
      setIsLoading(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct} disabled={isLoading}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}
