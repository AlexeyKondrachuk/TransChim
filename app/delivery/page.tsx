import type { Metadata } from "next";
import Image from "next/image";

import PriceRequestButton from "@/components/PriceRequestButton/PriceRequestButton";
import { DELIVERY_PAGE } from "@/components/data/delivery-page";

import styles from "./delivery.module.scss";
import CylinderDeliveryIcon from "@/components/Icons/CylinderDeliveryIcon";
import GasTankerIcon from "@/components/Icons/GasTankerIcon";
import WarehousePickupIcon from "@/components/Icons/WarehousePickupIcon";

export const metadata: Metadata = {
  title: "Доставка",
  description:
    "Доставка технических газов: баллоны по Тольятти, жидкие газы криоцистернами в любой регион России. Самовывоз со склада, работа по договору.",
};

const METHOD_ICONS = {
  cylinder: CylinderDeliveryIcon,
  tank: GasTankerIcon,
  pickup: WarehousePickupIcon,
} as const;

type MethodIconId = keyof typeof METHOD_ICONS;

export default function DeliveryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.inner} ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{DELIVERY_PAGE.title}</h1>
            <p className={styles.intro}>{DELIVERY_PAGE.intro}</p>
          </div>

          <div className={styles.heroMedia}>
            <Image
              src={DELIVERY_PAGE.heroImage.src}
              alt={DELIVERY_PAGE.heroImage.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.inner}>
        <section aria-labelledby="methods-title">
          <h2 id="methods-title" className={styles.sectionTitle}>
            Способы доставки
          </h2>

          <ul className={styles.methods}>
            {DELIVERY_PAGE.methods.map((method) => {
              const Icon =
                METHOD_ICONS[method.id as MethodIconId];

              return (
                <li key={method.id} className={styles.method}>
                  <span
                    className={styles.methodIcon}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>

                  <h3 className={styles.methodTitle}>
                    {method.title}
                  </h3>

                  <p className={styles.methodText}>
                    {method.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="zones-title">
          <h2 id="zones-title" className={styles.sectionTitle}>
            Зоны и сроки
          </h2>

          <ul className={styles.zones}>
            {DELIVERY_PAGE.zones.map((zone) => (
              <li key={zone.id} className={styles.zone}>
                <div className={styles.zoneHead}>
                  <h3 className={styles.zoneTitle}>
                    {zone.title}
                  </h3>

                  <span className={styles.zoneTime}>
                    {zone.time}
                  </span>
                </div>

                <p className={styles.zoneNote}>{zone.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="terms-title">
          <h2 id="terms-title" className={styles.sectionTitle}>
            Условия поставки
          </h2>

          <ul className={styles.terms}>
            {DELIVERY_PAGE.terms.map((term) => (
              <li key={term.id} className={styles.term}>
                <h3 className={styles.termTitle}>
                  {term.title}
                </h3>

                <p className={styles.termText}>
                  {term.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={styles.ctaBlock}
          aria-label="География поставок"
        >
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>
              География поставок
            </h2>

            <p className={styles.ctaParagraph}>
              {DELIVERY_PAGE.geography}
            </p>
          </div>

          <div className={styles.ctaActions}>
            <PriceRequestButton
              label="Рассчитать доставку"
              requestKind="request"
              modalTitle="Расчёт доставки"
            />

            <PriceRequestButton
              label="Заказать звонок"
              requestKind="callback"
              variant="outline"
            />
          </div>
        </section>
      </div>
    </div>
  );
}