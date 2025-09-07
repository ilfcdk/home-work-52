import { useAppDispatch } from '@/app/hooks';
import { deleteEquipment, updateEquipment } from '../thunks';
import { showToast } from '@/features/ui/uiSlice';
import type { Equipment } from '@/shared/types/equipment';

export default function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!confirm(`Видалити "${equipment.name}"?`)) return;
    try {
      await dispatch(deleteEquipment(equipment.id)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Обладнання видалено' }));
    } catch (e) {
      dispatch(showToast({ type: 'error', message: 'Не вдалося видалити' }));
    }
  };

  const handleRename = async () => {
    const newName = prompt('Нове ім’я обладнання:', equipment.name);
    if (!newName || newName === equipment.name) return;
    try {
      await dispatch(updateEquipment({ id: equipment.id, data: { name: newName } })).unwrap();
      dispatch(showToast({ type: 'success', message: 'Назву змінено' }));
    } catch (e) {
      dispatch(showToast({ type: 'error', message: 'Не вдалося змінити назву' }));
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{equipment.name}</h3>
      <p><strong>Код:</strong> {equipment.code}</p>
      {equipment.location && <p><strong>Локація:</strong> {equipment.location}</p>}
      <p><strong>Статус:</strong> {equipment.isActive ? 'Активне' : 'Неактивне'}</p>

      <div style={{ marginTop: 8 }}>
        <button onClick={handleRename} style={{ marginRight: 8 }}>Редагувати</button>
        <button onClick={handleDelete}>Видалити</button>
      </div>
    </div>
  );
}
