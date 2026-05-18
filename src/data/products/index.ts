import type { ProductDefinition, ProductType } from '../../types';
import { chairParts } from './chair';
import { tableParts } from './table';
import { bedParts } from './bed';
import { lampParts } from './lamp';
import { shelfParts } from './shelf';
import { cabinetParts } from './cabinet';
import { sofaParts } from './sofa';
import { deskParts } from './desk';
import { benchParts } from './bench';
import { coatrackParts } from './coatrack';

export const products: Record<ProductType, ProductDefinition> = {
  chair: { type: 'chair', name: 'Chair', nameZh: '椅子', parts: chairParts },
  table: { type: 'table', name: 'Table', nameZh: '桌子', parts: tableParts },
  bed: { type: 'bed', name: 'Bed', nameZh: '床', parts: bedParts },
  lamp: { type: 'lamp', name: 'Lamp', nameZh: '台灯', parts: lampParts },
  shelf: { type: 'shelf', name: 'Shelf', nameZh: '置物架', parts: shelfParts },
  cabinet: { type: 'cabinet', name: 'Cabinet', nameZh: '储物柜', parts: cabinetParts },
  sofa: { type: 'sofa', name: 'Sofa', nameZh: '沙发', parts: sofaParts },
  desk: { type: 'desk', name: 'Desk', nameZh: '书桌', parts: deskParts },
  bench: { type: 'bench', name: 'Bench', nameZh: '长凳', parts: benchParts },
  coatrack: { type: 'coatrack', name: 'Coat Rack', nameZh: '衣帽架', parts: coatrackParts },
};
