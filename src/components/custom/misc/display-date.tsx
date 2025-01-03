'use client';

export default function DisplayDate({ date }: { date: Date }) {
  return <span>{new Date(date).toLocaleDateString()}</span>;
}
