'use server';

export default async function DisplayDate({ date }: { date: Date }) {
  return <span>{new Date(date).toLocaleDateString()}</span>;
}
