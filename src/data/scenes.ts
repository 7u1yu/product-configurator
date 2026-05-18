export interface SceneConfig {
  id: string;
  name: string;
  nameZh: string;
  preset: 'studio' | 'apartment' | 'sunset';
  groundColor: string;
}

export const sceneConfigs: SceneConfig[] = [
  { id: 'living-room', name: 'Living Room', nameZh: '客厅', preset: 'apartment', groundColor: '#8B7355' },
  { id: 'office', name: 'Office', nameZh: '办公室', preset: 'studio', groundColor: '#D4C5B9' },
  { id: 'bedroom', name: 'Bedroom', nameZh: '卧室', preset: 'sunset', groundColor: '#6B5B4F' },
];
