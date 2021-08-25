import Carousel from "./carousel";
import Card from "./card";
import MainCard from "./main_card";
import ProductCard from "./product_card";
import MainHeader from "./main_header";
import SubHeader from "./sub_header";
import Example from "./example_card";
export default function Layout() {
  return (
    <>
      <SubHeader />
      <MainHeader />
      <div className="container">
        <dl>
          <dd className="main">
            <Carousel />
            <MainCard title="Төрөлүүд">
              <div className="home_category_container">
                <Example />
              </div>
            </MainCard>
            <MainCard title="Жижиг төрлүүд">
              <div className="home_category_container">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </MainCard>
            <MainCard title="Бараанууд" extra="Бүгд" extraUrl="">
              <div className="home_category_container">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
            </MainCard>
          </dd>
          <dt className="sidebar">
            <MainCard title="Мэдээ" extra="Бүгд">
              <Card />
              <Card />
              <Card />
              <Card />
            </MainCard>
          </dt>
        </dl>
      </div>
    </>
  );
}
