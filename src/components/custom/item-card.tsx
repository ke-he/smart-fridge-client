import styles from './item-card.module.css';
import { ArrowRight } from 'lucide-react';
import CustomButton from '@/components/custom/custom-button';

export interface ItemCardTypeSmall {
  id: number;
  name: string;
  quantity: number;
  item_type_id: number;
  img_url: string;
}

export interface ItemCardTypeBig {
  id: number;
  name: string;
  quantity: number;
  item_type_id: number;
  img_url: string;
  expiration_date: string;
}

export interface ItemCardTypeParams {
  itemCardSmall?: ItemCardTypeSmall;
  itemCardBig?: ItemCardTypeBig;
}

function ItemCardSmall({ param }: { param: ItemCardTypeSmall }) {
  return (
    <div className={styles.itemCardSmallWrapper}>
      <img
        className={styles.itemCardSmallImage}
        src={param.img_url}
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

function ItemCardBig({ param }: { param: ItemCardTypeBig }) {
  return (
    <div className={styles.itemCardBigWrapper}>
      <div className={styles.itemCardBigImageWrapper}>
        <img
          className={styles.itemCardBigImage}
          src={param.img_url}
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
  if (parentParam.itemCardSmall) {
    return <ItemCardSmall param={parentParam.itemCardSmall} />;
  }

  if (parentParam.itemCardBig) {
    return <ItemCardBig param={parentParam.itemCardBig} />;
  }
}
