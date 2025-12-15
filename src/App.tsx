import { Provider } from 'react-redux';
import { store } from './store/store';
import ServiceForm from './components/ServiceForm';
import SearchFilter from './components/SearchFilter';
import FilterStats from './components/FilterStats';
import ServiceList from './components/ServiceList';
import './App.css';

/** Главный компонент приложения для управления услугами с фильтрацией. */
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="container">
          <h1 className="app-title">Управление услугами</h1>
          <ServiceForm />
          <SearchFilter />
          <FilterStats />
          <ServiceList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
