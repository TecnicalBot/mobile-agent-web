import { allDocs, type Doc } from "contentlayer/generated";

export type DocGroup = {
  title: string;
  items: Doc[];
};

const groupOrder = ["Getting Started", "Guides", "API Reference", "Contributing"];

export function getDocGroups(): DocGroup[] {
  const byGroup = new Map<string, Doc[]>();

  for (const doc of allDocs) {
    const list = byGroup.get(doc.group) ?? [];
    list.push(doc);
    byGroup.set(doc.group, list);
  }

  const groups: DocGroup[] = [];
  for (const title of groupOrder) {
    const docs = byGroup.get(title);
    if (docs) {
      groups.push({ title, items: [...docs].sort((a, b) => a.order - b.order) });
    }
  }

  for (const [title, docs] of byGroup) {
    if (!groupOrder.includes(title)) {
      groups.push({ title, items: [...docs].sort((a, b) => a.order - b.order) });
    }
  }

  return groups;
}

export function getDocBySlug(slug: string): Doc | undefined {
  return allDocs.find((doc) => doc.slug === slug);
}

export function getFlattenedDocs(): Doc[] {
  return getDocGroups().flatMap((group) => group.items);
}

export function getPrevNext(current: Doc) {
  const flat = getFlattenedDocs();
  const index = flat.findIndex((doc) => doc.slug === current.slug);
  return {
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined,
  };
}

export type { Doc };