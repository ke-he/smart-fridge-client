'use client';

import styles from './item-card.module.css';
import { ArrowRight } from 'lucide-react';
import CustomButton from '../../misc/button/custom-button';
import { useRouter } from 'next/navigation';

export interface ItemCardTypeSmall {
  id: number;
  name: string;
  quantity: number;
  item_type_id: number;
  image_url?: string;
}

export interface ItemCardTypeBig {
  id: number;
  name: string;
  quantity: number;
  item_type_id: number;
  image_url?: string;
  expiration_date: string;
}

export interface ItemCardTypeParams {
  itemCardSmall?: ItemCardTypeSmall;
  itemCardBig?: ItemCardTypeBig;
}

function ItemCardSmall({
  param,
  routeCallback,
}: {
  param: ItemCardTypeSmall;
  routeCallback: () => void;
}) {
  return (
    <div onClick={routeCallback} className={styles.itemCardSmallWrapper}>
      <img
        className={styles.itemCardSmallImage}
        src={param.image_url || '/placeholder.png'}
        alt={param.name}
      />
      <div className={styles.itemCardSmallContent}>
        <div className={styles.itemCardSmallText}>
          <span className={styles.itemCardHeading}>{param.name}</span>
          <span className={styles.itemCardSecondHeading}>
            Quantity: {param.quantity}
          </span>
        </div>
        <div className={styles.itemCardSmallAction}>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

function ItemCardBig({
  param,
  routeCallback,
}: {
  param: ItemCardTypeBig;
  routeCallback: () => void;
}) {
  return (
    <div onClick={routeCallback} className={styles.itemCardBigWrapper}>
      <div className={styles.itemCardBigImageWrapper}>
        <img
          className={styles.itemCardBigImage}
          src={param.image_url || '/placeholder.png'}
          alt={param.name}
        />
        <span className={styles.itemCardBigDate}>{param.expiration_date}</span>
      </div>
      <div className={styles.itemCardBigContent}>
        <div className={styles.itemCardBigText}>
          <span className={styles.itemCardHeading}>{param.name}</span>
          <span className={styles.itemCardSecondHeading}>
            Quantity: {param.quantity}
          </span>
        </div>
        <div className={styles.itemCardBigAction}>
          <CustomButton>View Details</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default function ItemCard({
  parentParam,
}: {
  parentParam: ItemCardTypeParams;
}) {
  const router = useRouter();

  const getItemId = () => {
    return parentParam.itemCardSmall?.id || parentParam.itemCardBig?.id;
  };

  const handleClick = () => {
    router.push(`/inventory/${getItemId()}`);
  };

  if (parentParam.itemCardSmall) {
    return (
      <ItemCardSmall
        param={parentParam.itemCardSmall}
        routeCallback={handleClick}
      />
    );
  }

  if (parentParam.itemCardBig) {
    return (
      <ItemCardBig
        param={parentParam.itemCardBig}
        routeCallback={handleClick}
      />
    );
  }
}
