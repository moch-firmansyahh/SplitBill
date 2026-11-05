/**
 * Generate ID unik sederhana
 * @param {string} prefix - awalan ID, misal 'p' untuk person, 'i' untuk item
 * @returns {string}
 */
export function generateId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
