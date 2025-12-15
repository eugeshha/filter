import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, clearSearch } from '../store/actions';
import { selectSearchTerm } from '../store/selectors';
import type { RootState } from '../store/store';
import './SearchFilter.css';

/** Компонент поля поиска с фильтрацией услуг в реальном времени. */
const SearchFilter = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearSearch());
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Фокус на поле поиска при монтировании
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-filter">
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Поиск услуг..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            title="Очистить поиск"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
