import { useSelector } from 'react-redux';
import { selectFilterStats } from '../store/selectors';
import type { RootState } from '../store/store';
import './FilterStats.css';

/** Компонент статистики фильтрации "Найдено X из Y услуг". */
const FilterStats = () => {
  const { found, total } = useSelector((state: RootState) => selectFilterStats(state));

  return (
    <div className="filter-stats">
      Найдено: <strong>{found}</strong> из <strong>{total}</strong> услуг
    </div>
  );
};

export default FilterStats;
