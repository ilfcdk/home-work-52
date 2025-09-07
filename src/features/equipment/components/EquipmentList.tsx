import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchEquipment } from '../thunks';
import { selectEquipmentList, selectEquipmentLoading } from '../selectors';
import EquipmentCard from './EquipmentCard';

export default function EquipmentList() {
  const dispatch = useAppDispatch();
  const equipment = useAppSelector(selectEquipmentList);
  const loading = useAppSelector(selectEquipmentLoading);

  useEffect(() => {
    void dispatch(fetchEquipment());
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (!equipment.length) return <p>Обладнання ще не додано.</p>;

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {equipment.map((eq) => (
        <EquipmentCard key={eq.id} equipment={eq} />
      ))}
    </div>
  );
}
