import { useProductStore } from '../store/useProductStore';
import { Chair3D } from './products/Chair3D';
import { Table3D } from './products/Table3D';
import { Bed3D } from './products/Bed3D';
import { Lamp3D } from './products/Lamp3D';
import { Shelf3D } from './products/Shelf3D';
import { Cabinet3D } from './products/Cabinet3D';

interface Props {
  isCompare?: boolean;
}

export function ProductRenderer({ isCompare = false }: Props) {
  const currentProduct = useProductStore((s) => s.currentProduct);
  const parts = useProductStore((s) => s.parts);
  const selectedPart = useProductStore((s) => s.selectedPart);
  const selectPart = useProductStore((s) => s.selectPart);
  const compareProduct = useProductStore((s) => s.compareProduct);
  const compareParts = useProductStore((s) => s.compareParts);
  const compareSelectedPart = useProductStore((s) => s.compareSelectedPart);
  const selectComparePart = useProductStore((s) => s.selectComparePart);
  const exploded = useProductStore((s) => s.exploded);
  const wireframe = useProductStore((s) => s.wireframe);
  const showDimensions = useProductStore((s) => s.showDimensions);

  const product = isCompare ? compareProduct : currentProduct;
  const p = isCompare ? compareParts : parts;
  const sel = isCompare ? compareSelectedPart : selectedPart;
  const onSelect = isCompare ? selectComparePart : selectPart;

  const props = { parts: p, selectedPart: sel, selectPart: onSelect, exploded, wireframe, showDimensions };

  switch (product) {
    case 'chair': return <Chair3D {...props} />;
    case 'table': return <Table3D {...props} />;
    case 'bed': return <Bed3D {...props} />;
    case 'lamp': return <Lamp3D {...props} />;
    case 'shelf': return <Shelf3D {...props} />;
    case 'cabinet': return <Cabinet3D {...props} />;
  }
}
