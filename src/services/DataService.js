import { listTrucks } from './repositories/trucksRepo'
import { listWilayah, listAgenByWilayah, listJenis } from './repositories/masterRepo'
import { createInspection } from './repositories/inspectionsRepo'

export const DataService = {
  listTrucks,
  listWilayah,
  listAgenByWilayah,
  listJenis,
  createInspection,
}
