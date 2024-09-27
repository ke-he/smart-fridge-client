'use server';

export async function DisplayCount({ count }: { count: number }) {
  return <span>{count}x</span>;
}
