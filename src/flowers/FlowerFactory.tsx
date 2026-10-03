import { useFlowerStore } from '@/store/useFlowerStore';
import { BaseFlower } from './BaseFlower';
import { BouquetWrapper } from './BouquetWrapper';

export function FlowerFactory() {
  const flowers = useFlowerStore(state => state.flowers);

  return (
    <>
      <BouquetWrapper />
      {flowers.map((flower, index) => (
        <BaseFlower key={flower.id} data={flower} index={index} total={flowers.length} />
      ))}
    </>
  );
}
