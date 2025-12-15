import { useDispatch, useSelector } from 'react-redux';
import {
  setFormField,
  addService,
  updateService,
  cancelEditing,
  clearForm,
  setValidationError,
} from '../store/actions';
import { validateForm } from '../utils/validation';
import type { RootState } from '../store/store';
import './ServiceForm.css';

/** Компонент формы для добавления и редактирования услуг. */
const ServiceForm = () => {
  const dispatch = useDispatch();
  const { name, price, editingId, errors } = useSelector(
    (state: RootState) => state.form
  );
  const services = useSelector((state: RootState) => state.services.items);

  const editingService = editingId
    ? services.find((s) => s.id === editingId)
    : null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormField('name', e.target.value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormField('price', e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(name, price);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, error]) => {
        dispatch(setValidationError(field, error || ''));
      });
      return;
    }

    if (editingId) {
      dispatch(updateService(editingId, name.trim(), parseFloat(price)));
    } else {
      dispatch(addService(name.trim(), parseFloat(price)));
    }

    dispatch(clearForm());
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      {editingId && editingService && (
        <div className="form-header">
          <h2 className="form-title">
            Редактирование {editingService.name}
          </h2>
        </div>
      )}
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Название услуги"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`form-input ${errors.price ? 'error' : ''}`}
            placeholder="Цена"
            value={price}
            onChange={handlePriceChange}
          />
          {errors.price && <div className="error-message">{errors.price}</div>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            Save
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ServiceForm;
