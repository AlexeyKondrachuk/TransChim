import Products from "@/components/products/Products";
import styles from "./page.module.scss";
import Hero from "@/components/hero/Hero";
import AboutCompany from "@/components/AboutCompany/AboutCopmany";
import Industries from "@/components/Industries/Industries";
import WhyUs from "@/components/WhyUs/WhyUs";
import { Metadata } from "next";
import { SITE } from "@/components/config/site";

export const metadata: Metadata = {
  title: {
    absolute: 'Жидкий кислород, аргон и азот — ТрансХим',
  },
  description:
    'Поставка жидкого кислорода, жидкого аргона и жидкого азота. ' +
    'Доставка криоцистернами по России. ' +
    `Заказать и узнать стоимость: ${SITE.phoneDisplay}.`,
  alternates: {
    canonical: '/',
  },
};

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