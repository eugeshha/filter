import { createSelector } from 'reselect';
import type { RootState, Service } from '../types';

// Селектор для всех услуг
export const selectAllServices = (state: RootState): Service[] => state.services.items;

// Селектор для поискового запроса
export const selectSearchTerm = (state: RootState): string => state.filter.searchTerm;

// Селектор для отфильтрованных услуг
export const selectFilteredServices = createSelector(
  [selectAllServices, selectSearchTerm],
  (services: Service[], searchTerm: string): Service[] => {
    if (!searchTerm.trim()) {
      return services;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return services.filter((service) =>
      service.name.toLowerCase().includes(lowerSearchTerm)
    );
  }
);

// Селектор для статистики фильтрации
export const selectFilterStats = createSelector(
  [selectFilteredServices, selectAllServices],
  (filteredServices: Service[], allServices: Service[]) => ({
    found: filteredServices.length,
    total: allServices.length,
  })
);
