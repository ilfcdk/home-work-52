import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/hooks';
import { createTask } from '../thunks';
import { Priority, Status } from '@/shared/types/common';
import { showToast } from '@/features/ui/uiSlice';

const schema = z.object({
  title: z.string().min(3),
  equipmentId: z.string().min(1),
  plannedDate: z.string(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
  description: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function TaskForm({ onDone }: { onDone?: () => void }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: Status.PLANNED, priority: Priority.MEDIUM },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await dispatch(createTask(values as any)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Роботу створено' }));
      reset();
      onDone?.();
    } catch (e) {
      dispatch(showToast({ type: 'error', message: 'Не вдалося створити роботу' }));
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
      <input {...register('title')} placeholder="Назва" />
      {errors.title && <span>Мінімум 3 символи</span>}
      <input {...register('equipmentId')} placeholder="ID обладнання" />
      <input type="date" {...register('plannedDate')} />
      <select {...register('priority')}>
        {Object.values(Priority).map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <select {...register('status')}>
        {Object.values(Status).map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea {...register('description')} placeholder="Опис" />
      <button type="submit">Зберегти</button>
    </form>
  );
}
