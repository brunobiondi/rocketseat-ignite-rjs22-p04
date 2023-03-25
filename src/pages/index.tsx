import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import camiseta1 from '../assets/camisetas/1.png'
import { HomeContainer, Product } from '../styles/pages/home'

export default function Home() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {[...Array(10)].map((_, index) => (
        <Product key={index} className="keen-slider__slide">
          <Image src={camiseta1} alt="" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}
