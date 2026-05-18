import type { ProductDefinition, ProductType } from '../../types';
import { chairParts } from './chair';
import { tableParts } from './table';
import { bedParts } from './bed';
import { lampParts } from './lamp';
import { shelfParts } from './shelf';
import { cabinetParts } from './cabinet';

export const products: Record<ProductType, ProductDefinition> = {
  chair: { type: 'chair', name: 'Chair', nameZh: '椅子', parts: chairParts },
  table: { type: 'table', name: 'Table', nameZh: '桌子', parts: tableParts },
  bed: { type: 'bed', name: 'Bed', nameZh: '床', parts: bedParts },
  lamp: { type: 'lamp', name: 'Lamp', nameZh: '台灯', parts: lampParts },
  shelf: { type: 'shelf', name: 'Shelf', nameZh: '置物架', parts: shelfParts },
  cabinet: { type: 'cabinet', name: 'Cabinet', nameZh: '储物柜', parts: cabinetParts },
};
