import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/products'

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          aspernatur, cupiditate delectus facilis officia qui saepe. Ab ad amet
          architecto facere maiores nemo repellat similique voluptas. Amet neque
          possimus tempora!
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
