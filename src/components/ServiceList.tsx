import { useDispatch, useSelector } from 'react-redux';
import { deleteService, startEditing, clearForm } from '../store/actions';
import { selectFilteredServices } from '../store/selectors';
import type { RootState } from '../store/store';
import './ServiceList.css';

/** Компонент списка услуг с отображением отфильтрованных результатов. */
const ServiceList = () => {
  const dispatch = useDispatch();
  const filteredServices = useSelector((state: RootState) =>
    selectFilteredServices(state)
  );
  const allServices = useSelector((state: RootState) => state.services.items);
  const editingId = useSelector((state: RootState) => state.form.editingId);

  const handleEdit = (id: string) => {
    const service = allServices.find((s) => s.id === id);
    if (service) {
      dispatch(startEditing(service));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteService(id));
    if (editingId === id) {
      dispatch(clearForm());
    }
  };

  return (
    <div className="service-list">
      <div className="service-list-header">
        <h2 className="service-list-title">Список услуг</h2>
      </div>
      {filteredServices.length === 0 ? (
        <div className="empty-message">
          {allServices.length === 0
            ? 'Список услуг пуст'
            : 'Услуги не найдены'}
        </div>
      ) : (
        <ul className="service-items">
          {filteredServices.map((service) => (
            <li key={service.id} className="service-item">
              <span className="service-name">{service.name}</span>
              <span className="service-price">{service.price}</span>
              <div className="service-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(service.id)}
                  title="Редактировать"
                >
                  ✎
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(service.id)}
                  title="Удалить"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceList;
