import { notFound } from "next/navigation";
import { CollectionScreen } from "@/components/collection-screen";
import { collectionBySlug, collections } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();
  return <CollectionScreen key={collection.slug} collection={collection} />;
}
