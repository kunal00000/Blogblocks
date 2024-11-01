import { Active, MeasuringStrategy, UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { SortableTransition } from "@dnd-kit/sortable/dist/hooks/types";

export function animateLayoutChanges(args: {
  active: Active | null;
  containerId: UniqueIdentifier;
  isDragging: boolean;
  isSorting: boolean;
  id: UniqueIdentifier;
  index: number;
  items: UniqueIdentifier[];
  previousItems: UniqueIdentifier[];
  previousContainerId: UniqueIdentifier;
  newIndex: number;
  transition: SortableTransition | null;
  wasDragging: boolean;
}) {
  const { isSorting, wasDragging } = args;

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
}

export const MEASURING_CONFIG = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};
