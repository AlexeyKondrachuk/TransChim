import Products from "@/components/products/Products";
import styles from "./page.module.scss";
import Hero from "@/components/hero/Hero";
import AboutCompany from "@/components/AboutCompany/AboutCopmany";
import Industries from "@/components/Industries/Industries";
import WhyUs from "@/components/WhyUs/WhyUs";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
       <Products />
       <AboutCompany />
       <Industries/>
       <WhyUs/>
    </main>
  );
}