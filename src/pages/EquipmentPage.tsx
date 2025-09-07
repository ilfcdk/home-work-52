// EquipmentPage
import EquipmentList from '@/features/equipment/components/EquipmentList';
import EquipmentForm from '@/features/equipment/components/EquipmentForm';

export default function EquipmentPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Обладнання</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Додати нове обладнання</h3>
        <EquipmentForm />
      </section>

      <section>
        <h3>Список обладнання</h3>
        <EquipmentList />
      </section>
    </div>
  );
}
