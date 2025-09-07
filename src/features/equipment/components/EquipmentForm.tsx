import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { Equipment } from '@/shared/types/equipment';
import { createEquipment } from '../thunks';
import { showToast } from '@/features/ui/uiSlice';

type FormValues = Omit<Equipment, 'id'>;

export default function EquipmentForm({ onDone }: { onDone?: () => void }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.equipment.loading);
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { isActive: true },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(createEquipment(data)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Обладнання збережено' }));
      reset();
      onDone?.();
    } catch (e) {
      dispatch(showToast({ type: 'error', message: 'Не вдалося зберегти обладнання' }));
      console.error(e);
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
      <input {...register('name', { required: true })} placeholder="Назва обладнання" />
      <input {...register('code', { required: true })} placeholder="Інвентарний код" />
      <input {...register('location')} placeholder="Локація" />
      <input {...register('model')} placeholder="Модель" />
      <input {...register('vendor')} placeholder="Виробник" />
      <label>
        <input type="checkbox" {...register('isActive')} /> Активне
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Збереження…' : 'Зберегти'}
      </button>
    </form>
  );
}
